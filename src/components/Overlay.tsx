import { useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Section 1 (0% - 100%): Centered Intro sliding to Left on desktop
  // On desktop, it slides left and stays visible. On mobile, it stays centered and fades out early to avoid overlap.
  const opacity1 = useTransform(
    scrollYProgress,
    isDesktop ? [0, 0.15, 0.85, 0.95] : [0, 0.05, 0.15],
    isDesktop ? [1, 0.9, 0.9, 0] : [1, 1, 0]
  );

  const x1 = useTransform(
    scrollYProgress,
    [0, 0.25],
    isDesktop ? ["0vw", "-20vw"] : ["0vw", "0vw"]
  );

  const scale1 = useTransform(
    scrollYProgress,
    [0, 0.25],
    isDesktop ? [1, 0.7] : [1, 1]
  );

  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, 0]);

  // Scroll indicator: visible on initial screen, disappears after first scroll (past 5%)
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between text-white py-16">
      {/* Top Nav Spacer */}
      <div className="h-16" />

      {/* Main Content Area */}
      <div className="relative flex-1 flex items-center justify-center">
        
        {/* Section 1: Centered Intro */}
        <motion.div
          style={{ opacity: opacity1, y: y1, x: x1, scale: scale1 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
        >
          <motion.h1 
            initial={{ letterSpacing: "0.05em" }}
            animate={{ letterSpacing: "0.01em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 uppercase leading-none text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400"
          >
            SREEKAR BOORLE
          </motion.h1>
          <p className="text-sm md:text-lg lg:text-xl font-medium text-gray-300 tracking-wider mb-3 font-mono">
            Python Developer | Backend & API Developer
          </p>
          <p className="text-xs md:text-sm text-gray-400 max-w-md font-light leading-relaxed">
            Python Software Engineer specializing in building scalable web applications, REST APIs, and automated backend systems.
          </p>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-2.5 bg-white rounded-full"
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
          Scroll to Explore
        </span>
      </motion.div>
    </div>
  );
}
