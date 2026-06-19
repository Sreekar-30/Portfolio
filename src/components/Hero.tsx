"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";

export default function Hero() {
  return (
    <div className="relative animate-fadeIn" id="home">
      {/* Top Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 md:px-16 py-8 text-white bg-transparent pointer-events-none">
        <span className="text-xl font-bold tracking-widest font-mono pointer-events-auto cursor-default uppercase">
          SREEKAR
        </span>
      </nav>

      <ScrollyCanvas>
        {(progress) => <Overlay scrollYProgress={progress} />}
      </ScrollyCanvas>
    </div>
  );
}
