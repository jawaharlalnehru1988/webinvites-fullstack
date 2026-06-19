import { useState } from "react";
import { NAVY, GOLD } from "../shared/Tokens";
import { CustomScratchCard } from "../shared/CustomScratchCard";
import confetti from "canvas-confetti";

export function SaveTheDateSection() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleComplete = () => {
    setIsRevealed(true);
    
    // Elegant gold/white confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#bc9268", "#ffffff", "#e8d3ba"]
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#bc9268", "#ffffff", "#e8d3ba"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const renderPetal = (
    width: number, 
    top?: string | number, 
    left?: string | number, 
    right?: string | number, 
    bottom?: string | number, 
    rotate: string = "0deg",
    delay: number = 0,
    floatDuration: number = 6
  ) => {
    if (!isRevealed) return null;
    return (
      <img
        src="/images/rose_petal.svg"
        alt=""
        aria-hidden
        className="absolute object-contain pointer-events-none z-20"
        style={{ 
          width, top, left, right, bottom, 
          "--initial-rotate": rotate,
          transform: `rotate(${rotate})`,
          animation: `fadeInPetals 2s ease-in ${delay}s forwards, floatPetal ${floatDuration}s ease-in-out ${delay}s infinite`,
          opacity: 0,
          filter: "drop-shadow(0px 6px 8px rgba(0,0,0,0.4))"
        } as React.CSSProperties}
      />
    );
  };

  return (
    <section
      className="relative w-full py-12 px-6 flex flex-col items-center gap-8 overflow-hidden"
      style={{ background: `${NAVY}` }}
    >
      <style>{`
        @keyframes floatPetal {
          0% { transform: translateY(0px) rotate(var(--initial-rotate)); }
          50% { transform: translateY(-15px) rotate(calc(var(--initial-rotate) + 8deg)); }
          100% { transform: translateY(0px) rotate(var(--initial-rotate)); }
        }
        @keyframes fadeInPetals {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* SVG Rose Petals - gradually float in after reveal */}
      {renderPetal(40, "15%", "10%", undefined, undefined, "160deg", 0.5, 6)}      {/* Top Left */}
      {renderPetal(26, "20%", undefined, "12%", undefined, "-130deg", 1.2, 5.5)}    {/* Top Right */}
      {renderPetal(20, "34%", "40%", undefined, undefined, "-140deg", 2.0, 7)}    {/* Center Below Text */}
      {renderPetal(45, "52%", undefined, "8%", undefined, "-130deg", 1.5, 6.5)}     {/* Overlapping Card Right */}
      {renderPetal(28, undefined, "15%", undefined, "12%", "130deg", 0.8, 5)}     {/* Bottom Left */}
      {renderPetal(20, undefined, undefined, "20%", "5%", "-140deg", 2.5, 6)}     {/* Bottom Right */}

      {/* Prompt / Revealed Text */}
      <div className="relative flex flex-col items-center justify-center mt-2 mb-2 h-[60px] w-full">
        <div 
          className="absolute flex flex-col items-center gap-2 transition-opacity duration-1000" 
          style={{ opacity: isRevealed ? 0 : 1, pointerEvents: isRevealed ? 'none' : 'auto' }}
        >
          <p
            className="uppercase tracking-[3px] text-white text-center"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 14 }}
          >
            Scratch to
          </p>
          <p
            className="uppercase tracking-[4px] text-white text-center"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, fontWeight: 700 }}
          >
            Reveal the Date
          </p>
        </div>

        <div 
          className="absolute flex flex-col items-center gap-2 transition-opacity duration-1000" 
          style={{ opacity: isRevealed ? 1 : 0, pointerEvents: isRevealed ? 'auto' : 'none' }}
        >
          <p
            className="uppercase tracking-[4px] text-white text-center leading-tight"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, fontWeight: 700 }}
          >
            Witness Our<br />New Beginning
          </p>
        </div>
      </div>

      {/* Card */}
      <CustomScratchCard width={320} height={220} coverColor="#bc9268" onComplete={handleComplete}>
        <div
          className="relative flex flex-col items-center justify-center gap-4"
          style={{
            width: 320,
            height: 220,
            background: "linear-gradient(232deg, rgb(255,201,121) 2%, rgb(255,255,255) 94%)",
            border: "1px solid #bc9268",
            borderRadius: "19px",
            padding: "1.5rem",
          }}
        >
          <p
            className="uppercase tracking-[6px] text-black text-center"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, fontWeight: 700 }}
          >
            Save the Date
          </p>
          <p
            className="text-black text-center"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: 44 }}
          >
            24th June 2026
          </p>
          <p
            className="uppercase tracking-[6px] text-black text-center"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 15 }}
          >
            Wednesday
          </p>
        </div>
      </CustomScratchCard>
    </section>
  );
}
