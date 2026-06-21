"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import ConsoleHeader from "@/components/ConsoleHeader";
import PartySelector, { membersData } from "@/components/PartySelector";
import ActiveDossier from "@/components/ActiveDossier";
import CinematicBackground from "@/components/CinematicBackground";
import { playSelect } from "@/utils/sounds";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = right/next, -1 = left/prev
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    playSelect();
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % membersData.length);
  }, []);

  const handlePrev = useCallback(() => {
    playSelect();
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + membersData.length) % membersData.length);
  }, []);

  // Keyboard navigation for active member
  useEffect(() => {
    if (!isLoaded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoaded, handleNext, handlePrev]);

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
      if (e.deltaY > 0) {
        // Scroll down -> Next
        handleNext();
      } else {
        // Scroll up -> Prev
        handlePrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLoaded, handleNext, handlePrev]);

  // Touch / Swipe navigation fallback for mobile background (ignores card touches to avoid conflicts)
  useEffect(() => {
    if (!isLoaded) return;

    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // If the touch started/ended inside the dossier card, let Framer Motion drag handle it
      const target = e.target as HTMLElement;
      if (target && target.closest(".glass-card")) {
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX; // Positive if swiped LEFT (scrolling RIGHT)
      const diffY = touchStartY - touchEndY;

      // Only handle horizontal swipes and ignore if it's primarily a vertical scroll
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isLoaded, handleNext, handlePrev]);

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
          className="flex-1 flex flex-col h-[100dvh] overflow-hidden relative z-10"
        >
          {/* Cinematic Background Layer */}
          <CinematicBackground />

          {/* Subtle grid pattern & glow backgrounds */}
          <div className="absolute inset-0 grid-dot-bg pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-portal-teal/5 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse" />

          {/* Minimal Header */}
          <ConsoleHeader />

          {/* Main Content Area: Centered Active Dossier */}
          <div
            ref={containerRef}
            className="flex-1 flex items-start md:items-center justify-center px-4 py-6 md:p-6 z-10 overflow-y-auto"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <ActiveDossier
                key={activeIndex}
                member={activeMember}
                direction={direction}
                onSwipeLeft={handleNext}
                onSwipeRight={handlePrev}
              />
            </AnimatePresence>
          </div>

          {/* Selector and Legend Footer */}
          <div className="w-full flex flex-col items-center pb-8 px-6 space-y-4 z-10">
            {/* Horizontal Timeline Selector */}
            <PartySelector
              activeIndex={activeIndex}
              onSelect={(idx) => {
                if (idx !== activeIndex) {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }
              }}
            />

            {/* Keyboard & Scroll Interaction Legend */}
            <div className="font-mono text-[9px] text-text-muted tracking-widest uppercase flex items-center space-x-2">
              <span className="hidden md:inline">[←/→] Navigate</span>
              <span className="hidden md:inline opacity-30">•</span>
              <span className="hidden md:inline">[SPACE] Cycle</span>
              <span className="hidden md:inline opacity-30">•</span>
              <span className="hidden md:inline">[SCROLL] Switch</span>
              <span className="inline md:hidden">[SWIPE L/R] NAVIGATE</span>
              <span className="inline md:hidden opacity-30">•</span>
              <span className="inline md:hidden">[TAP TABS] SELECT</span>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
