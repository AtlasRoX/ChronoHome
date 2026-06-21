"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { getMuted, toggleMute, playTick } from "@/utils/sounds";

export default function ConsoleHeader() {
  const [time, setTime] = useState("");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Sync initial mute state in next tick to avoid synchronous cascading renders
    const timer = setTimeout(() => {
      setMuted(getMuted());
    }, 0);

    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hrs}:${mins}:${secs}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleMuteToggle = () => {
    const nextMuted = toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      playTick();
    }
  };

  return (
    <header className="w-full border-b border-white/5 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center text-xs font-mono text-text-phosphor select-none relative z-20">
      {/* Brand logo */}
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="CHRONOSTRIDER Logo"
          width={96}
          height={28}
          className="w-24 h-7 object-contain filter drop-shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-transform duration-300 hover:scale-105 cursor-pointer"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>

      {/* Clock & Sound Control */}
      <div className="flex items-center space-x-6 text-text-muted">
        {/* Real-time Clock */}
        <span className="font-jetbrains-mono tracking-wider text-[11px] opacity-80">
          {time}
        </span>

        {/* Audio Mute Switch */}
        <button
          onClick={handleMuteToggle}
          className="p-1 cursor-pointer hover:text-portal-teal text-text-muted transition-colors relative flex items-center justify-center w-6 h-6"
          title={muted ? "Unmute sounds" : "Mute sounds"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
