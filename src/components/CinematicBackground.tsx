"use client";

import Image from "next/image";
import bgImage from "../../public/3180.jpg";

export default function CinematicBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-obsidian-deep select-none">
      {/* 1. CRT Screen Flicker Layer containing the image channels */}
      <div className="absolute inset-0 w-full h-full animate-crt-flicker">
        
        {/* Base Cinematic Image (Darkened for maximum text legibility) */}
        <div className="absolute inset-0 w-full h-full opacity-[0.16] filter brightness-[0.75] contrast-[1.05]">
          <Image
            src={bgImage}
            alt="Cinematic Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Chromatic Aberration Glitch Layer 1 (Red Shift) */}
        <div className="absolute inset-0 w-full h-full glitch-layer-red opacity-45">
          <Image
            src={bgImage}
            alt="Cinematic Background Red Glitch"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Chromatic Aberration Glitch Layer 2 (Blue Shift) */}
        <div className="absolute inset-0 w-full h-full glitch-layer-blue opacity-45">
          <Image
            src={bgImage}
            alt="Cinematic Background Blue Glitch"
            fill
            priority
            className="object-cover"
          />
        </div>

      </div>

      {/* 2. CRT Scanline & Sub-pixel Grid Overlay (More pronounced CRT effect) */}
      <div className="absolute inset-0 w-full h-full bg-crt-lines opacity-[0.25]" />

      {/* 3. CRT Rolling Scanline Bar */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="crt-scanline-bar" />
      </div>

      {/* 4. Cinematic Dark Edge Vignette */}
      <div className="absolute inset-0 w-full h-full bg-radial-vignette mix-blend-multiply" />

      {/* 6. Cinematic Moving Film Grain Overlay */}
      <div className="absolute inset-0 w-full h-full bg-film-grain" />
    </div>
  );
}
