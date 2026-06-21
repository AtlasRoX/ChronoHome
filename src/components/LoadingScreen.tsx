"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { playWarp } from "@/utils/sounds";

interface LoadingScreenProps {
  onFinished: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Fill the progress bar in 1000ms
    const duration = 1000;
    const intervalTime = 16; // ~60fps
    const increment = (100 / duration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      playWarp();
      const dismissTimer = setTimeout(() => {
        setIsDismissed(true);
        const finishTimer = setTimeout(() => {
          onFinished();
        }, 500);
        return () => clearTimeout(finishTimer);
      }, 150);
      return () => clearTimeout(dismissTimer);
    }
  }, [progress, onFinished]);

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-obsidian-deep z-50 flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 grid-dot-bg pointer-events-none" />

          {/* Centered minimal branding */}
          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 relative flex items-center justify-center w-72 h-24 float-animation"
            >
              {/* Subtle ambient light behind logo */}
              <div className="absolute inset-0 bg-portal-teal/20 blur-3xl rounded-full scale-y-50" />
              <Image
                src="/logo.png"
                alt="CHRONOSTRIDER Logo"
                width={288}
                height={84}
                className="h-[84px] w-auto object-contain relative z-10 filter drop-shadow-[0_0_25px_rgba(0,240,255,0.45)]"
                style={{ width: "auto" }}
                priority
              />
            </motion.div>

            {/* Clean, thin loading bar */}
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <div
                className="h-full bg-portal-teal transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.2 }}
              className="text-[9px] font-mono text-text-muted mt-3 tracking-widest uppercase"
            >
              Initializing Session
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
