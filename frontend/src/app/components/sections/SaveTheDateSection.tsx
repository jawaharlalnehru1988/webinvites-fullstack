import { NAVY, GOLD } from "../shared/Tokens";
import { CustomScratchCard } from "../shared/CustomScratchCard";

export function SaveTheDateSection() {
  const renderPetal = (width: number, top?: string | number, left?: string | number, right?: string | number, bottom?: string | number, rotate?: string) => (
    <img
      src="/images/rose_petal.svg"
      alt=""
      aria-hidden
      className="absolute object-contain pointer-events-none z-20"
      style={{ width, top, left, right, bottom, transform: `rotate(${rotate})` }}
    />
  );

  return (
    <section
      className="relative w-full py-12 px-6 flex flex-col items-center gap-8 overflow-hidden"
      style={{ background: `${NAVY}` }}
    >
      {/* SVG Rose Petals */}
      {renderPetal(40, "15%", "10%", undefined, undefined, "160deg")}      {/* Top Left */}
      {renderPetal(26, "20%", undefined, "12%", undefined, "-130deg")}    {/* Top Right */}
      {renderPetal(20, "34%", "40%", undefined, undefined, "-140deg")}    {/* Center Below Text */}
      {renderPetal(45, "52%", undefined, "8%", undefined, "-130deg")}     {/* Overlapping Card Right */}
      {renderPetal(28, undefined, "15%", undefined, "12%", "130deg")}     {/* Bottom Left */}
      {renderPetal(20, undefined, undefined, "20%", "5%", "-140deg")}     {/* Bottom Right */}

      {/* Scratch Prompt */}
      <div className="flex flex-col items-center gap-2 mt-2 mb-2">
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

      {/* Card */}
      <CustomScratchCard width={320} height={220} coverColor="#bc9268">
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
