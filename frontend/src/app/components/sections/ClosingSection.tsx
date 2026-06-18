import { TEAL, DARK_NAVY } from "../shared/Tokens";
import { LeafImg } from "../shared/Decorations";

export function ClosingSection() {
  return (
    <section
      className="w-full py-16 px-8 flex flex-col items-center gap-8"
      style={{ background: TEAL, overflow: "hidden" }}
    >
      <div className="flex items-center justify-center -space-x-[85px]">
        <img
          src="/images/lying_feather.svg"
          alt=""
          className="object-contain"
          style={{ width: 90, height: 60, transform: "scaleX(-1) rotate(-10deg)" }}
        />
        <img
          src="/images/lying_feather.svg"
          alt=""
          className="object-contain"
          style={{ width: 90, height: 60, transform: "rotate(-20deg)" }}
        />
      </div>
      <p
        className="uppercase tracking-[1.44px] text-white text-center"
        style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, fontWeight: 700, maxWidth: 340 }}
      >
        We look forward to celebrating this joyous occasion with you.
      </p>
      <p
        className="capitalize text-center"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 56,
          color: DARK_NAVY,
          maxWidth: 340,
        }}
      >
        Sayli &amp; Shubham
      </p>
    </section>
  );
}
