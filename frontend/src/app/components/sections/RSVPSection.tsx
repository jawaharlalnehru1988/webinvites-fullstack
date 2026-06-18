import { useState } from "react";
import { NAVY } from "../shared/Tokens";
import { LeafImg } from "../shared/Decorations";
import { RadioButton } from "../shared/Icons";

export function RSVPSection() {
  const [form, setForm] = useState({
    name: "",
    guests: "",
    attending: "yes",
  });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit RSVP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting RSVP. Please make sure the server is running.");
    }
  }

  const inputClass =
    "w-full bg-white border border-[#f2e8d5] rounded px-4 py-3 text-[#1a1a1a] placeholder-[#1a1a1a]/40 outline-none focus:border-[#bc9268] transition-colors";
  const inputStyle = { fontFamily: "'Hind', sans-serif", fontSize: 16 };
  const labelStyle = {
    fontFamily: "'EB Garamond', serif",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "1.44px",
    textTransform: "uppercase" as const,
  };

  return (
    <section
      className="w-full py-12 px-6 flex flex-col items-center gap-10"
      style={{ background: "linear-gradient(199deg, #fff 5%, #a8d8cf 92%)" }}
    >
      {/* Heading */}
      <div className="flex flex-col items-center">
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
          className="uppercase tracking-[2.88px] text-black text-center"
          style={{ fontFamily: "'EB Garamond', serif", fontSize: 36, fontWeight: 700 }}
        >
          Be Part of Our Story
        </p>
      </div>

      {submitted ? (
        <div className="text-center flex flex-col items-center gap-4">
          <p
            className="capitalize text-black"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: 48 }}
          >
            Thank You!
          </p>
          <p
            className="uppercase tracking-[1px] text-black"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 14 }}
          >
            We look forward to celebrating with you.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label style={labelStyle}>Full Name</label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Number of Guests */}
          <div className="flex flex-col gap-2">
            <label style={labelStyle}>Number of Guests</label>
            <div className="relative">
              <select
                className="w-full bg-white border border-[#f2e8d5] rounded px-4 py-3 text-[#1a1a1a] outline-none appearance-none focus:border-[#bc9268] transition-colors"
                style={inputStyle}
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                required
              >
                <option value="" disabled>Select guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#C5A059" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div className="flex flex-col gap-3">
            <label style={labelStyle}>Will you attend?</label>
            <div className="flex flex-wrap gap-6">
              {[
                { value: "yes", label: "Joyfully Accepts" },
                { value: "no", label: "Regretfully Declines" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className="flex items-center gap-3"
                  onClick={() => setForm({ ...form, attending: value })}
                >
                  <RadioButton selected={form.attending === value} />
                  <span style={{ fontFamily: "'Hind', sans-serif", fontSize: 18 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>



          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg py-5 flex items-center justify-center hover:opacity-90 transition-opacity"
            style={{ background: NAVY }}
          >
            <span
              className="capitalize tracking-[1.68px] text-white"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, fontWeight: 500 }}
            >
              Send RSVP
            </span>
          </button>
        </form>
      )}
    </section>
  );
}
