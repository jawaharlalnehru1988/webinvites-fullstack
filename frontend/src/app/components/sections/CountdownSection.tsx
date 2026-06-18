import { useState, useEffect } from "react";
import { TEAL, COUNTDOWN_TILE, WEDDING_DATE } from "../shared/Tokens";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    function update() {
      const now = Date.now();
      const diff = Math.max(0, WEDDING_DATE.getTime() - now);
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, mins, secs });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DAYS", value: pad(timeLeft.days) },
    { label: "HOURS", value: pad(timeLeft.hours) },
    { label: "MINS", value: pad(timeLeft.mins) },
    { label: "SECS", value: pad(timeLeft.secs) },
  ];

  return (
    <section className="w-full py-10 px-6 flex flex-col items-center gap-8" style={{ background: TEAL }}>
      <p
        className="uppercase tracking-[1.68px] text-black text-center"
        style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, fontWeight: 700 }}
      >
        The Celebration Begins In
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div
              className="relative rounded-lg flex items-center justify-center"
              style={{
                width: 82,
                height: 82,
                background: COUNTDOWN_TILE,
                padding: 6,
              }}
            >
              <div
                className="flex items-center justify-center w-full h-full rounded-md bg-white"
                style={{ border: "0.333px solid #bc9268" }}
              >
                <span
                  className="text-black text-center"
                  style={{ fontFamily: "'EB Garamond', serif", fontSize: 36, fontWeight: 500 }}
                >
                  {value}
                </span>
              </div>
            </div>
            <span
              className="uppercase tracking-[4px] text-black text-center"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: 13, fontWeight: 500 }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
