```
 ██████╗██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗████████╗██████╗  ██████╗██████╗ ███████╗██████╗ 
██╔════╝██║  ██║██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝╚══██╔══╝██╔══██╗╚════██║██╔══██╗██╔════╝██╔══██╗
██║     ███████║██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗   ██║   ██████╔╝ █████╔╝██████╔╝█████╗  ██████╔╝
██║     ██╔══██║██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║   ██║   ██╔══██╗ ╚═══██╗██╔══██╗██╔═══╝ ██╔══██╗
╚██████╗██║  ██║██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║   ██║   ██║  ██║██████╔╝██║  ██║███████╗██║  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
```

<div align="center">
  <h3>⚡ CHRONOSTRIDER // TEMPORAL COGNITION TERMINAL ⚡</h3>
  <p>A high-fidelity landing and dossier interface documenting time-traveling technologists inside a futuristic pixel universe.</p>

  [![Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20React%2019-00f0ff?style=flat-square&logo=nextdotjs&logoColor=white)](#-dossier-architecture)
  [![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-ff007f?style=flat-square&logo=tailwindcss&logoColor=white)](#-dossier-architecture)
  [![Vibe](https://img.shields.io/badge/Vibe-Cyberpunk%20Scanlines-ffb000?style=flat-square)](#-visual-interface-spells)
  [![Status](https://img.shields.io/badge/Chronos-Synchronized-00ff66?style=flat-square)](#-temporal-protocols)
</div>

---

## 🌀 Chrono-Dossier Overview

**CHRONOSTRIDER** is a competitive engineering and research collective. This application functions as a **Terminal Interface** to decrypt, render, and display active profiles (Dossiers) of team members scattered across temporal anomalies. 

The site merges highly polished **cyberpunk aesthetics** (CRT scanline distortion, signal flicker, glowing glassmorphic panels) with **interactive soundscapes** and **fluid transitions** to create an engaging, immersive developer portfolio.

---

## 🛠 Dossier Architecture

The platform runs on a modern, high-performance web stack tailored for visual richness:

* **Core Framework**: [Next.js 16 (Turbopack compiler)](https://nextjs.org/) & [React 19](https://react.dev/)
* **Styling & Theme Engine**: [Tailwind CSS v4](https://tailwindcss.com/) (using native CSS custom properties, `@theme` directives, and dynamic viewport layouts)
* **Animation & Spatial Interpolation**: [Framer Motion](https://www.framer.com/motion/) (powering slide transitions, dossier card slides, loading screen fades, and interactive hover feedback)
* **3D Canvas & WebGL Integration**: [Three.js](https://threejs.org/) via `@react-three/fiber` & `@react-three/drei` (supporting background matrix shaders and future interactive 3D assets)
* **Icons**: [Lucide React](https://lucide.dev/) (phosphor-cyber aesthetic vector elements)
* **Analytics**: **Google Analytics (GA4)** integrated via optimized Next.js `<Script>` injection (configured to track routing state changes with Zero Hydration mismatch)

---

## ✨ Visual Interface Spells

| System | Technology | Behavior / Implementation |
| :--- | :--- | :--- |
| **Glitch Scanline Overlay** | CSS linear-gradients & keyframe animations | Generates moving horizontal CRT scanlines, CRT screen flicker, and subtle film grain overlay. |
| **Glassmorphism Panels** | `backdrop-filter: blur()` | Translucent console cards with faint borders, soft shadows, and light-refraction hover glow. |
| **Interactive Sound Design** | Web Audio API / HTML5 Audio | Triggered warp speed sounds on initialization, select clicks on navigation, and soundboard muting toggles. |
| **Multimodal Controls** | Event Listeners | Navigate active dossiers using Keyboard (`←`/`→`/`Space`), Mouse Trackpad scrolling, or Mobile Swipe drag gestures. |
| **Dossier Cards** | Framer Motion & custom clip-path SVG | Seamless layout morphing between member profiles with status graphs (e.g. chronotropy, combat, temporal stability). |

---

## 📁 System Directories

```
landing/
├── public/                 # Static assets (fonts, logo, images)
│   ├── 3180.jpg            # Cinematic background matrix image
│   └── logo.png            # Team brand identity logo
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind v4 directives, custom animations, CRT styling
│   │   ├── layout.tsx      # Root server layout, SEO metadata, Google Analytics setup
│   │   └── page.tsx        # Dashboard entry point, layout wrappers, event handlers
│   ├── components/
│   │   ├── LoadingScreen.tsx        # Full-page loading bar with fade transitions
│   │   ├── ConsoleHeader.tsx        # System clocks, status trackers, audio controller
│   │   ├── PartySelector.tsx        # Interactive timeline selector tabs
│   │   ├── ActiveDossier.tsx        # Active member card (skills, bio, radar charts)
│   │   ├── CinematicBackground.tsx  # CRT overlay, vignette filters, grain rendering
│   │   └── RetroProgressBar.tsx     # Custom segmented progress meters
│   └── utils/
│       └── sounds.ts       # Central audio utility for triggers & volume state
```

---

## 🔌 System Initialization

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) configured on your machine.

1. **Clone the chronos repository:**
   ```bash
   git clone https://github.com/AtlasRoX/ChronoHome.git
   cd ChronoHome
   ```

2. **Retrieve environment packages:**
   ```bash
   pnpm install
   ```

3. **Ignite the local terminal server:**
   ```bash
   pnpm dev
   ```

4. **Verify compiler outputs:**
   Open `http://localhost:3000` to decrypt your console interface.

---

## 🛡 Temporal Protocols

When writing modifications for the ChronoStrider console, adhere to these protocols:

> [!IMPORTANT]
> **Image Scaling**: Always use Next.js `Image` tags with the height set via `className` (e.g. `h-[84px]`), width set to `w-auto`, and the inline style `style={{ width: "auto" }}` to satisfy the linter and preserve layout ratios.

> [!TIP]
> **Analytics Setup**: The Google Analytics tag `G-96WFPDMQ15` is registered as an inline `next/script` inside `layout.tsx` running `afterInteractive`. Do not manually bundle duplicate tags in nested pages.

> [!WARNING]
> **Acoustics Engine**: Web Audio triggers (`sounds.ts`) require initial user interaction before browser authorization. The audio controller has a local storage state sync to cleanly persist muting configurations.
