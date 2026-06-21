"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { playTick, playSelect } from "@/utils/sounds";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  classTitle: string;
  university: string;
  level: number;
  handle: string;
  skills: { label: string; value: number; color?: "teal" | "pink" | "amber" | "muted" | "emerald" }[];
  github: string;
  email: string;
  color: "teal" | "pink" | "amber" | "muted" | "emerald";
  avatarGrid: number[][];
}

// Pre-defined SVG grid pixel patterns for custom team member avatars
export const membersData: TeamMember[] = [
  {
    name: "Abdur Rahman Fahad",
    role: "Lead Strategist",
    classTitle: "Lead Systems Synthesizer / Temporal Architect",
    university: "Dhaka International University",
    level: 42,
    handle: "GhostCache_",
    color: "teal",
    github: "https://github.com",
    email: "fahad@chronostrider.io",
    avatarGrid: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0]
    ],
    skills: [
      { label: "Cognitive Reasoning", value: 86, color: "teal" },
      { label: "Algorithmic Logic", value: 91, color: "teal" },
      { label: "Spatial Architecture", value: 78, color: "teal" },
      { label: "Entropy Mitigation", value: 72, color: "teal" }
    ]
  },
  {
    name: "Mohammad Irfan",
    role: "Operations Commander",
    classTitle: "System Warden / Compiler Sentinel",
    university: "Shanto-Mariam University of Creative Technology",
    level: 38,
    handle: "Irfan",
    color: "amber",
    github: "https://github.com",
    email: "irfan@chronostrider.io",
    avatarGrid: [
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0]
    ],
    skills: [
      { label: "Systems Thinking", value: 84, color: "amber" },
      { label: "Infrastructure Operations", value: 78, color: "amber" },
      { label: "Temporal Threading", value: 81, color: "amber" },
      { label: "Deterministic Analytics", value: 68, color: "amber" }
    ]
  },
  {
    name: "Sadiya Sultana Purnima",
    role: "Aesthetic Navigator",
    classTitle: "Cognitive Architect / Experience Cartographer",
    university: "Dhaka International University",
    level: 35,
    handle: "Purnima",
    color: "pink",
    github: "https://github.com",
    email: "purnima@chronostrider.io",
    avatarGrid: [
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0]
    ],
    skills: [
      { label: "Visual Diagnostics", value: 62, color: "pink" },
      { label: "Cognitive Empathy Mapping", value: 58, color: "pink" },
      { label: "System Integrity Verification", value: 52, color: "pink" },
      { label: "Entropy Analysis", value: 44, color: "pink" }
    ]
  },
  {
    name: "Maria Nusrat",
    role: "Interaction Orchestrator",
    classTitle: "UX Vector Choreographer / Interface Sentinel",
    university: "Shanto-Mariam University of Creative Technology",
    level: 34,
    handle: "Maria",
    color: "emerald",
    github: "https://github.com",
    email: "maria@chronostrider.io",
    avatarGrid: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0]
    ],
    skills: [
      { label: "Choreographic Mechanics", value: 65, color: "emerald" },
      { label: "Interface Affordance", value: 59, color: "emerald" },
      { label: "Aesthetics Calibration", value: 55, color: "emerald" },
      { label: "Usability Diagnostics", value: 48, color: "emerald" }
    ]
  }
];

interface PartySelectorProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

const shortNames = ["FAHAD", "IRFAN", "PURNIMA", "MARIA"];

export default function PartySelector({ activeIndex, onSelect }: PartySelectorProps) {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const getThemeColorHex = (color: string) => {
    switch (color) {
      case "pink": return "#ff007f";
      case "amber": return "#ffb000";
      case "emerald": return "#00ff66";
      case "teal":
      default:
        return "#00f0ff";
    }
  };

  const handleMouseEnter = () => {
    playTick();
  };

  const handleItemSelect = (index: number) => {
    playSelect();
    onSelect(index);
  };

  const activeColorHex = getThemeColorHex(membersData[activeIndex].color);

  return (
    <div className="flex items-center justify-center select-none w-full pt-4 max-w-3xl mx-auto px-4">
      {/* Left Navigation Arrow */}
      <button
        onClick={() => handleItemSelect((activeIndex - 1 + membersData.length) % membersData.length)}
        onMouseEnter={() => {
          handleMouseEnter();
          setIsLeftHovered(true);
        }}
        onMouseLeave={() => setIsLeftHovered(false)}
        className="p-1.5 md:p-2 mr-2 md:mr-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center group shrink-0"
        style={{
          color: isLeftHovered ? activeColorHex : "#9b9aa5",
          borderColor: isLeftHovered ? `${activeColorHex}40` : "rgba(255,255,255,0.05)",
          backgroundColor: isLeftHovered ? `${activeColorHex}08` : "rgba(255,255,255,0.01)",
          boxShadow: isLeftHovered ? `0 0 12px ${activeColorHex}15` : "none",
          outline: "none"
        }}
        title="Previous Tab"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Horizontal Nav List */}
      <div className="flex-1 flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-3 md:gap-x-8 gap-y-1">
        {membersData.map((member, idx) => {
          const isActive = idx === activeIndex;
          const displayLabel = `${String(idx + 1).padStart(2, "0")} / ${shortNames[idx]}`;

          return (
            <div
              key={idx}
              className="relative py-2 px-1 sm:px-2 cursor-pointer transition-all duration-200"
              onMouseEnter={handleMouseEnter}
              onClick={() => handleItemSelect(idx)}
            >
              <span
                className={`font-space-grotesk tracking-[0.15em] sm:tracking-[0.25em] text-[9px] sm:text-[10px] md:text-xs font-bold ${
                  isActive ? "text-white" : "text-text-muted hover:text-white/60"
                } transition-colors`}
              >
                {displayLabel}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTimelineIndicator"
                  className="absolute bottom-0 left-1 right-1 h-[2px] shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                  style={{ backgroundColor: getThemeColorHex(member.color) }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => handleItemSelect((activeIndex + 1) % membersData.length)}
        onMouseEnter={() => {
          handleMouseEnter();
          setIsRightHovered(true);
        }}
        onMouseLeave={() => setIsRightHovered(false)}
        className="p-1.5 md:p-2 ml-2 md:ml-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center group shrink-0"
        style={{
          color: isRightHovered ? activeColorHex : "#9b9aa5",
          borderColor: isRightHovered ? `${activeColorHex}40` : "rgba(255,255,255,0.05)",
          backgroundColor: isRightHovered ? `${activeColorHex}08` : "rgba(255,255,255,0.01)",
          boxShadow: isRightHovered ? `0 0 12px ${activeColorHex}15` : "none",
          outline: "none"
        }}
        title="Next Tab"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
