"use client";

import { MotionValue, useTransform, motion, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState, ReactNode, useCallback } from "react";

interface ScrollyCanvasProps {
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const totalFrames = 40;

  // Custom scroll progress MotionValue to pass to Overlay children
  const scrollProgress = useMotionValue(0);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);

  // Preload image sequence on mount
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Choose folder based on window width
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const folder = isMobile ? "MOBILE-sequence" : "sequence";

    const fillFailedImages = (arr: HTMLImageElement[]) => {
      let firstValid: HTMLImageElement | null = null;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].naturalWidth > 0) {
          firstValid = arr[i];
          break;
        }
      }

      if (!firstValid) {
        console.error("No valid images could be loaded!");
        return;
      }

      let lastValid = firstValid;
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i] || arr[i].naturalWidth === 0) {
          arr[i] = lastValid;
        } else {
          lastValid = arr[i];
        }
      }
    };

    const handleImageLoad = (index: number) => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      if (loadedCount === totalFrames) {
        fillFailedImages(loadedImages);
        imagesRef.current = loadedImages;
        setImagesLoaded(true);
      }
    };

    const handleImageError = (index: number) => {
      console.warn(`Failed to load frame ${index + 1}`);
      loadedCount++;
      if (loadedCount === totalFrames) {
        fillFailedImages(loadedImages);
        imagesRef.current = loadedImages;
        setImagesLoaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/${folder}/ezgif-frame-${frameNum}.png`;
      img.onload = () => handleImageLoad(i - 1);
      img.onerror = () => handleImageError(i - 1);
      loadedImages.push(img);
    }
  }, []);

  // Draw a frame given scroll progress (0 to 1)
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded || imagesRef.current.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Map progress to frame index
    let frameIndex = 0;
    if (typeof progress === "number" && !isNaN(progress) && isFinite(progress)) {
      frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(progress * totalFrames)));
    }
    
    const img = imagesRef.current[frameIndex];
    if (!img) return;

    // Cover logic for canvas (object-fit: cover implementation)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (imgWidth === 0 || imgHeight === 0) {
      // Don't draw or clear if the image dimensions are 0 (prevents black flashes)
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;

    const x = (canvasWidth - newWidth) / 2;
    const y = (canvasHeight - newHeight) / 2;

    ctx.drawImage(img, x, y, newWidth, newHeight);
  }, [imagesLoaded]);

  // Handle canvas resize to be responsive
  useEffect(() => {
    if (!imagesLoaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawFrame(progressRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, drawFrame]);

  // High-performance requestAnimationFrame loop with LERP (linear interpolation) for smooth scrubbing
  useEffect(() => {
    if (!imagesLoaded) return;

    let animFrameId: number;

    const updateFrame = () => {
      // Linear interpolation (lerp) smoothing
      const diff = targetProgressRef.current - progressRef.current;
      progressRef.current += diff * 0.12; // 0.12 is the smoothing factor

      if (Math.abs(diff) > 0.0001) {
        drawFrame(progressRef.current);
        scrollProgress.set(progressRef.current);
      } else {
        progressRef.current = targetProgressRef.current;
        drawFrame(progressRef.current);
        scrollProgress.set(progressRef.current);
      }

      animFrameId = requestAnimationFrame(updateFrame);
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      
      let progress = 0;
      if (scrollHeight > 0) {
        progress = Math.min(1, Math.max(0, scrolled / scrollHeight));
      }
      
      if (isNaN(progress) || !isFinite(progress)) {
        progress = 0;
      }
      
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call in case page was refreshed scrolled down
    handleScroll();
    
    animFrameId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, [imagesLoaded, drawFrame, scrollProgress, loadProgress]);

  // Smoothly fade out and slide up at the very end of scroll (95% to 100%)
  const stickyOpacity = useTransform(scrollProgress, [0.95, 1], [1, 0]);
  const stickyY = useTransform(scrollProgress, [0.95, 1], [0, -100]);
  const stickyPointerEvents = useTransform(scrollProgress, (value) => 
    value >= 0.95 ? "none" : "auto"
  );

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#000000]">
      {/* Sticky/Fixed view container */}
      <motion.div 
        style={{ opacity: stickyOpacity, y: stickyY, pointerEvents: stickyPointerEvents }}
        className="fixed top-0 left-0 h-screen w-full overflow-hidden"
      >
        {/* Loading overlay */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#000000]">
            <div className="w-16 h-16 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4" />
            <span className="text-sm font-mono text-gray-400 tracking-wider animate-pulse">
              LOADING EXPERIENCE... {loadProgress}%
            </span>
          </div>
        )}

        {/* Render canvas when loaded */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover bg-[#000000] z-0"
        />

        {/* Cinematic Vignette / Readability Gradients */}
        <div 
          style={{
            background: "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.75) 100%)"
          }}
          className="absolute inset-0 pointer-events-none z-5" 
        />
        <div 
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.65) 100%)"
          }}
          className="absolute inset-0 pointer-events-none z-5" 
        />

        {/* Overlay sections */}
        {imagesLoaded && children && children(scrollProgress)}
      </motion.div>
    </div>
  );
}
