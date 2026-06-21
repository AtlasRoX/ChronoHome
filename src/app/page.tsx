"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import ConsoleHeader from "@/components/ConsoleHeader";
import PartySelector, { membersData } from "@/components/PartySelector";
import ActiveDossier from "@/components/ActiveDossier";
import { playSelect } from "@/utils/sounds";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for active member
  useEffect(() => {
    if (!isLoaded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        playSelect();
        setActiveIndex((prev) => (prev + 1) % membersData.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        playSelect();
        setActiveIndex((prev) => (prev - 1 + membersData.length) % membersData.length);
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        playSelect();
        setActiveIndex((prev) => (prev + 1) % membersData.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoaded]);

  // Wheel / Scroll navigation for active member with smart boundary checking
  useEffect(() => {
    if (!isLoaded) return;

    let lastScrollTime = 0;
    const cooldownMs = 800; // Cooldown to prevent fast cycling

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // Ignore very small scroll deltas (e.g. slow trackpad drift)
      if (Math.abs(e.deltaY) < 15) return;

      // Check if container is currently scrollable vertically
      const isScrollable = container.scrollHeight > container.clientHeight;

      if (isScrollable) {
        // If content overflows, only switch tab when scrolling at the boundaries
        if (e.deltaY > 0) {
          // Scrolling down - check if we are at the bottom
          const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
          if (!isAtBottom) return; // Allow natural scroll down
        } else {
          // Scrolling up - check if we are at the top
          const isAtTop = container.scrollTop <= 5;
          if (!isAtTop) return; // Allow natural scroll up
        }
      }

      const now = Date.now();
      if (now - lastScrollTime < cooldownMs) return;

      lastScrollTime = now;
      playSelect();
      if (e.deltaY > 0) {
        // Scroll down -> Next
        setActiveIndex((prev) => (prev + 1) % membersData.length);
      } else {
        // Scroll up -> Prev
        setActiveIndex((prev) => (prev - 1 + membersData.length) % membersData.length);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLoaded]);

  // Touch / Swipe navigation for mobile
  useEffect(() => {
    if (!isLoaded) return;

    let touchStartY = 0;
    let lastScrollTime = 0;
    const cooldownMs = 800;
    const minSwipeDistance = 50; // Minimum drag distance to trigger a switch

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const now = Date.now();
      if (now - lastScrollTime < cooldownMs) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY; // Positive if swiped UP (scrolling DOWN)

      if (Math.abs(diffY) > minSwipeDistance) {
        // Check if content overflows
        const isScrollable = container.scrollHeight > container.clientHeight;

        if (isScrollable) {
          if (diffY > 0) {
            // Swipe up (scroll down) - check if at bottom
            const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
            if (!isAtBottom) return;
          } else {
            // Swipe down (scroll up) - check if at top
            const isAtTop = container.scrollTop <= 5;
            if (!isAtTop) return;
          }
        }

        lastScrollTime = now;
        playSelect();
        if (diffY > 0) {
          // Swipe up (scrolling down) -> Next
          setActiveIndex((prev) => (prev + 1) % membersData.length);
        } else {
          // Swipe down (scrolling up) -> Prev
          setActiveIndex((prev) => (prev - 1 + membersData.length) % membersData.length);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isLoaded]);

  const activeMember = membersData[activeIndex];

  return (
    <main className="flex-1 w-full relative flex flex-col min-h-screen bg-obsidian-deep overflow-hidden select-none">
      {/* 1. Sleek Splash Screen / Loading Screen */}
      <LoadingScreen onFinished={() => setIsLoaded(true)} />

      {/* 2. Main Minimal Interface */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 flex flex-col h-screen overflow-hidden relative z-10"
        >
          {/* Subtle grid pattern & glow backgrounds */}
          <div className="absolute inset-0 grid-dot-bg pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-portal-teal/5 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse" />

          {/* Minimal Header */}
          <ConsoleHeader />

          {/* Main Content Area: Centered Active Dossier */}
          <div
            ref={containerRef}
            className="flex-1 flex items-center justify-center p-4 md:p-6 z-10 overflow-y-auto"
          >
            <AnimatePresence mode="wait">
              <ActiveDossier key={activeIndex} member={activeMember} />
            </AnimatePresence>
          </div>

          {/* Selector and Legend Footer */}
          <div className="w-full flex flex-col items-center pb-8 px-6 space-y-4 z-10">
            {/* Horizontal Timeline Selector */}
            <PartySelector
              activeIndex={activeIndex}
              onSelect={(idx) => setActiveIndex(idx)}
            />

            {/* Keyboard & Scroll Interaction Legend */}
            <div className="font-mono text-[9px] text-text-muted tracking-widest uppercase flex items-center space-x-2">
              <span>[←/→] Navigate</span>
              <span className="opacity-30">•</span>
              <span>[SPACE] Cycle</span>
              <span className="opacity-30">•</span>
              <span>[SCROLL] Switch</span>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
