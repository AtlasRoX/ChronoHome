"use client";

import { motion } from "framer-motion";
import { Mail, GraduationCap } from "lucide-react";
import { playTick, playSelect } from "@/utils/sounds";
import { TeamMember } from "./PartySelector";
import RetroProgressBar from "./RetroProgressBar";
import { useState } from "react";

interface ActiveDossierProps {
  member: TeamMember;
  direction?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const dossierVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : direction < 0 ? -80 : 0,
    y: direction === 0 ? 15 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : direction < 0 ? 80 : 0,
    y: direction === 0 ? -15 : 0,
    opacity: 0,
  }),
};

export default function ActiveDossier({ member, direction = 0, onSwipeLeft, onSwipeRight }: ActiveDossierProps) {
  const [activeSlotHover, setActiveSlotHover] = useState<string>("");

  const renderLargeAvatar = (grid: number[][], color: "teal" | "pink" | "amber" | "muted" | "emerald") => {
    const getFillColor = (pixelVal: number) => {
      if (pixelVal === 0) return "transparent";
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

    return (
      <svg 
        viewBox="0 0 8 8" 
        className="w-full h-full pixelated" 
        style={{ imageRendering: "pixelated" }}
      >
        {grid.map((row, rIdx) =>
          row.map((val, cIdx) => (
            <rect
              key={`large-${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width={1}
              height={1}
              fill={getFillColor(val)}
              shapeRendering="crispEdges"
            />
          ))
        )}
      </svg>
    );
  };

  const getGlowClass = (color: string) => {
    switch (color) {
      case "pink": return "glow-pink";
      case "amber": return "glow-amber";
      case "emerald": return "glow-emerald";
      case "teal":
      default:
        return "glow-teal";
    }
  };

  const getAccentColorHex = (color: string) => {
    switch (color) {
      case "pink": return "#ff007f";
      case "amber": return "#ffb000";
      case "emerald": return "#00ff66";
      case "teal":
      default:
        return "#00f0ff";
    }
  };

  const getHeadingColorClass = (color: string) => {
    switch (color) {
      case "pink": return "text-glitch-pink";
      case "amber": return "text-cyber-amber";
      case "emerald": return "text-cyber-emerald";
      case "teal":
      default:
        return "text-portal-teal";
    }
  };

  const getHoverBorderClass = (color: string) => {
    switch (color) {
      case "pink": return "hover:border-glitch-pink/40";
      case "amber": return "hover:border-cyber-amber/40";
      case "emerald": return "hover:border-cyber-emerald/40";
      case "teal":
      default:
        return "hover:border-portal-teal/40";
    }
  };

  return (
    <motion.div
      key={member.name}
      custom={direction}
      variants={dossierVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeOut" }}
      drag="x"
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(event, info) => {
        const swipeThreshold = 80;
        const swipeVelocity = 400;
        if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
          if (onSwipeLeft) onSwipeLeft();
        } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
          if (onSwipeRight) onSwipeRight();
        }
      }}
      className={`glass-card ${getGlowClass(member.color)} w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y`}
    >
      {/* Decorative fine-detail line glow at the top */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-70"
        style={{
          background: `linear-gradient(95deg, transparent, ${getAccentColorHex(member.color)}, transparent)`
        }}
      />

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 float-animation">
            
            {/* Ambient Background Gradient Orb behind avatar */}
            <div 
              className="absolute inset-2 blur-2xl opacity-20 rounded-full"
              style={{ backgroundColor: getAccentColorHex(member.color) }}
            />

            {/* Subtle frame overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 rounded-br-lg" />

            {/* Render Custom Pixel Avatar */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 scale-95 md:scale-100">
              {renderLargeAvatar(member.avatarGrid, member.color)}
            </div>
          </div>
          
          <div className="font-mono text-[9px] text-text-muted tracking-widest uppercase">
            {member.handle}
          </div>
        </div>

        {/* Info Details Section */}
        <div className="flex-1 space-y-5 text-left">
          <div>
            <h2 className="text-xl md:text-2xl font-space-grotesk font-bold tracking-wide text-white">
              {member.name}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${getHeadingColorClass(member.color)}`}>
                {member.classTitle}
              </span>
            </div>
            
            <div className="flex items-center space-x-1.5 text-xs text-text-muted mt-2 font-mono">
              <GraduationCap className="w-4 h-4 opacity-60" />
              <span>{member.university}</span>
            </div>
          </div>

          <div className="border-t border-white/5" />

          {/* Stats Matrix */}
          <div className="space-y-4">
            <span className="text-[9px] text-text-muted font-mono tracking-widest block uppercase">
              Synapse Metrics
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {member.skills.map((skill, index) => (
                <RetroProgressBar
                  key={index}
                  label={skill.label}
                  value={skill.value}
                  color={member.color}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-white/5" />

          {/* Links Slot */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {/* GitHub Link slot */}
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  playTick();
                  setActiveSlotHover("View Git Archives");
                }}
                onMouseLeave={() => setActiveSlotHover("")}
                onClick={playSelect}
                className={`flex items-center justify-between backdrop-blur-md bg-white/2 border border-white/6 ${getHoverBorderClass(
                  member.color
                )} hover:bg-white/5 p-2.5 rounded-xl transition-all group cursor-pointer`}
              >
                <div className="flex items-center space-x-2.5 font-mono text-[10px] text-text-phosphor">
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-white transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  <span className="font-space-grotesk tracking-wider font-semibold group-hover:text-white transition-colors">GitHub</span>
                </div>
                <span className="text-text-muted group-hover:text-white text-[8px] font-mono tracking-widest transition-colors uppercase">
                  Open
                </span>
              </a>

              {/* Email Link slot */}
              <a
                href={`mailto:${member.email}`}
                onMouseEnter={() => {
                  playTick();
                  setActiveSlotHover("Dispatch Message");
                }}
                onMouseLeave={() => setActiveSlotHover("")}
                onClick={playSelect}
                className={`flex items-center justify-between backdrop-blur-md bg-white/2 border border-white/6 ${getHoverBorderClass(
                  member.color
                )} hover:bg-white/5 p-2.5 rounded-xl transition-all group cursor-pointer`}
              >
                <div className="flex items-center space-x-2.5 font-mono text-[10px] text-text-phosphor">
                  <Mail className="w-[15px] h-[15px] text-text-muted group-hover:text-white transition-colors" />
                  <span className="font-space-grotesk tracking-wider font-semibold group-hover:text-white transition-colors">Contact</span>
                </div>
                <span className="text-text-muted group-hover:text-white text-[8px] font-mono tracking-widest transition-colors uppercase">
                  Mail
                </span>
              </a>
            </div>

            {/* Gear Microcopy Prompt display */}
            <div className="h-3 font-mono text-[9px] text-text-muted text-center italic tracking-wider">
              {activeSlotHover ? `> ${activeSlotHover}` : ""}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
