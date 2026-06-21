"use client";

import { motion } from "framer-motion";

interface RetroProgressBarProps {
  value: number; // 0 to 100
  color?: "teal" | "pink" | "amber" | "muted" | "emerald";
  label?: string;
  displayValue?: string;
}

export default function RetroProgressBar({
  value,
  color = "teal",
  label,
  displayValue
}: RetroProgressBarProps) {
  const getThemeColorHex = () => {
    switch (color) {
      case "pink": return "#ff007f";
      case "amber": return "#ffb000";
      case "muted": return "#6c5d80";
      case "emerald": return "#00ff66";
      case "teal":
      default:
        return "#00f0ff";
    }
  };

  const getGlowShadow = () => {
    switch (color) {
      case "pink": return "shadow-[0_0_8px_rgba(255,0,127,0.8)]";
      case "amber": return "shadow-[0_0_8px_rgba(255,176,0,0.8)]";
      case "emerald": return "shadow-[0_0_8px_rgba(0,255,102,0.8)]";
      case "muted": return "";
      case "teal":
      default:
        return "shadow-[0_0_8px_rgba(0,240,255,0.8)]";
    }
  };

  const colorHex = getThemeColorHex();

  return (
    <div className="w-full font-mono text-[10px] select-none">
      {/* Label and Value */}
      <div className="flex justify-between items-center mb-1 text-text-phosphor/80">
        {label && <span className="uppercase tracking-wider text-[9px] text-text-muted">{label}</span>}
        <span className="font-semibold text-white/90">{displayValue || `${value}%`}</span>
      </div>

      {/* Modern thin timeline line with glowing terminal point */}
      <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-visible mt-2">
        {/* Fill Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: colorHex }}
        />

        {/* Glow Cursor Dot */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${getGlowShadow()} pulse-glow-anim`}
          style={{ backgroundColor: colorHex }}
        />
      </div>
    </div>
  );
}
