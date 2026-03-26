"use client";

import { useState } from "react";
import { Contact } from "./Contact";
import { DotGrid } from "./DotGrid";
import { FloatingCv } from "./FloatingCv";
import { Footer } from "./Footer";
import { Grain } from "./Grain";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Projects } from "./Projects";
import { Scanlines } from "./Scanlines";
import { Skills } from "./Skills";
import { Timeline } from "./Timeline";
import { WelcomeScreen } from "./WelcomeScreen";

export function Portfolio() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)]">
      {!entered && <WelcomeScreen onEnter={() => setEntered(true)} />}
      {entered && <FloatingCv />}

      <div
        className={`transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${entered ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
        aria-hidden={!entered}
        inert={!entered}
      >
        <DotGrid />
        <Scanlines />
        <Grain />
        <div className="relative z-[6]">
          <Nav />
          <Home />
          <div className="border-t border-[#0f0f0f]" />
          <Skills />
          <div className="border-t border-[#0f0f0f]" />
          <Projects />
          <div className="border-t border-[#0f0f0f]" />
          <Timeline />
          <div className="border-t border-[#0f0f0f]" />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
}
