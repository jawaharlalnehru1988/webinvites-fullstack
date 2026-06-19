import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../shared/Icons";

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCompletedOneCycle, setHasCompletedOneCycle] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Disable scrolling until the video completes one cycle
    if (!hasCompletedOneCycle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [hasCompletedOneCycle]);

  const handleInteraction = () => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error("Playback failed", err));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !hasCompletedOneCycle) {
      const { currentTime, duration } = videoRef.current;
      // Pause the video right before it reaches the end so it plays exactly once
      // We keep the loop attribute on the video tag to prevent early stop bugs
      if (duration && currentTime >= duration - 0.2) {
        videoRef.current.pause();
        setHasCompletedOneCycle(true);
      }
    }
  };

  return (
    <section
      className="relative w-full bg-white cursor-pointer"
      onClick={handleInteraction}
    >
      <video
        ref={videoRef}
        playsInline
        loop
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-auto block"
      >
        <source src="/videos/Hero%20Video%204mb.mp4" type="video/mp4" />
      </video>

      {/* Show play instruction if not playing */}
      {!isPlaying && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center bg-transparent transition-opacity">
          <div className="flex flex-col items-center gap-4">
            <span
              className="text-white tracking-widest uppercase text-sm md:text-base"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Click to Open
            </span>
          </div>
        </div>
      )}

      {/* Scroll indicator - show only after one cycle */}
      {hasCompletedOneCycle && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0b0f1a] px-4 py-3 rounded-full border border-white/10 shadow-lg animate-bounce">
          <div className="flex flex-col gap-0.5">
            <ChevronDownIcon />
            <ChevronDownIcon />
          </div>
          <span
            className="text-white tracking-widest uppercase text-sm"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Scroll Down
          </span>
        </div>
      )}
    </section>
  );
}
