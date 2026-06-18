import { ChevronDownIcon } from "../shared/Icons";

export function HeroSection() {
  return (
    <section className="relative w-full bg-white">
      {/* Video drives the section height naturally (YouTube Short style) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto block"
      >
        <source src="/videos/Hero%20Video.mp4" type="video/mp4" />
      </video>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0b0f1a] px-4 py-3 rounded-full border border-white/10 shadow-lg">
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
    </section>
  );
}
