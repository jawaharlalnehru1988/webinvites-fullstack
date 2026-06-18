import { DARK_NAVY } from "../shared/Tokens";
import { LeafImg } from "../shared/Decorations";

export function FooterSection() {
  return (
    <footer
      className="w-full py-8 px-6 flex flex-col items-center gap-3"
      style={{ background: DARK_NAVY }}
    >
      <div className="flex flex-col items-center gap-1">
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
          style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, fontWeight: 700 }}
        >
          made with love
        </p>
      </div>
      <p
        className="lowercase tracking-[1.44px] text-white text-center"
        style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, fontWeight: 700 }}
      >
        www.theinvitecompany.in
      </p>
    </footer>
  );
}
