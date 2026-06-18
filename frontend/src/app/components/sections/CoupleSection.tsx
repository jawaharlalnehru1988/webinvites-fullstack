import { OLIVE, TEAL_LIGHT, NAVY } from "../shared/Tokens";
import { LeafImg } from "../shared/Decorations";

export function CoupleSection() {
  return (
    <section
      className="w-full py-12 px-6 flex flex-col items-center gap-2"
      style={{ background: "linear-gradient(199deg, #fff 5%, #a8d8cf 92%)" }}
    >
      <p
        className="uppercase tracking-[1.68px] text-black text-center"
        style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, fontWeight: 700 }}
      >
        Together with their families
      </p>

      {/* Bride */}
      <p
        className="capitalize text-black text-center mt-4"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: 64 }}
      >
        Sayli Jadhav
      </p>
      <p
        className="uppercase tracking-[1.08px] text-black text-center"
        style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, fontWeight: 500 }}
      >
        Daughter of Mr. Sakharam &amp; Mrs. Supriya Jadhav
      </p>

      {/* Ampersand circle & Feather */}
      <div className="relative flex items-center justify-center my-6 w-full">
        <div className="relative flex items-center justify-center z-10">
          <svg width="98" height="98" viewBox="0 0 98 98" fill="none">
            <circle cx="49" cy="49" r="48.5" stroke={OLIVE} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 80, height: 80, background: "#ffcc80" }}
            >
              <span
                className="capitalize text-black text-center relative z-10"
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: 44 }}
              >
                &amp;
              </span>
            </div>
          </div>
        </div>
        
        {/* Lying Feather */}
        <img
          src="/images/lying_feather.svg"
          alt=""
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 210,
            top: "50%",
            left: "50%",
            transform: "translate(-40%, -40%)",
            zIndex: 0
          }}
        />
      </div>

      {/* Groom */}
      <p
        className="capitalize text-black text-center"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: 64 }}
      >
        Shubham Mali
      </p>
      <p
        className="uppercase tracking-[1.08px] text-black text-center mt-1"
        style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, fontWeight: 500 }}
      >
        Son of Mr. Sanjay &amp; Mrs. Bharati Mali
      </p>

      {/* Banner */}
      <div className="w-full mt-6 py-5 px-4" style={{ background: NAVY }}>
        <p
          className="uppercase tracking-[0.96px] text-white text-center"
          style={{ fontFamily: "'EB Garamond', serif", fontSize: 13, fontWeight: 700 }}
        >
          Request the honour of your presence as they unite in marriage
        </p>
      </div>
    </section>
  );
}
