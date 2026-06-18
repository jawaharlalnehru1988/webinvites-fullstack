import { TEAL, NAVY } from "../shared/Tokens";
import svgPaths from "../../../imports/LandingScreen/svg-do8kux12on";

interface EventInfo {
  title: string;
  date: string;
  time: string;
  venue: string;
}

function EventCard({ event }: { event: EventInfo }) {
  const topBanner = (
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: -52, width: 280, height: 54 }}
    >
      <div className="rotate-180 w-full h-full">
        <svg className="block w-full h-full" viewBox="0 0 232.965 84.2236" fill="none" preserveAspectRatio="none">
          <path d={svgPaths.p548e900} fill="white" />
        </svg>
      </div>
    </div>
  );

  const bottomBanner = (
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{ bottom: -50, width: 283, height: 54 }}
    >
      <svg className="block w-full h-full" viewBox="0 0 237.985 85.2223" fill="none" preserveAspectRatio="none">
        <path d={svgPaths.p37c8f080} fill="white" />
      </svg>
    </div>
  );

  return (
    <div className="relative w-full max-w-sm mx-auto mt-16">
      <div
        className="relative bg-white rounded-[27px] p-10 flex flex-col gap-8"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      >
        {topBanner}

        {/* Title row with feather */}
        <div className="flex items-center justify-center gap-2 w-full">
          <div className="overflow-hidden flex items-center justify-end" style={{ width: 40, height: 65 }}>
            <img
              src="/images/lying_feather.svg"
              alt=""
              style={{ width: 65, height: 65, transform: "rotate(-5deg)", flexShrink: 0, maxWidth: "none" }}
            />
          </div>
          <p
            className="uppercase tracking-[2px] text-black text-center"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, fontWeight: 700 }}
          >
            {event.title}
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <img src="/images/calendar_month.svg" alt="Calendar" className="object-contain" style={{ width: 24, height: 24 }} />
            <p
              className="capitalize tracking-[1.68px] text-black"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, fontWeight: 500 }}
            >
              {event.date}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <img src="/images/schedule.svg" alt="Clock" className="object-contain" style={{ width: 24, height: 24 }} />
            <p
              className="capitalize tracking-[1.68px] text-black"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, fontWeight: 500 }}
            >
              {event.time}
            </p>
          </div>
          <div className="flex items-start gap-5">
            <img src="/images/location.svg" alt="Location" className="object-contain mt-1" style={{ width: 24, height: 24 }} />
            <p
              className="capitalize tracking-[1.68px] text-black leading-snug"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, fontWeight: 500 }}
            >
              {event.venue}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full rounded-lg py-5 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: NAVY }}
          onClick={() =>
            window.open(
              `https://maps.google.com?q=${encodeURIComponent(event.venue)}`,
              "_blank"
            )
          }
        >
          <span
            className="capitalize tracking-[1.68px] text-white"
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, fontWeight: 500 }}
          >
            Get Direction
          </span>
        </button>

        {bottomBanner}
      </div>
    </div>
  );
}

const EVENTS: EventInfo[] = [
  {
    title: "Engagement",
    date: "Tuesday, June 23, 2026",
    time: "5:00 PM Onwards",
    venue: "Param Banquet, Sainath Nagar, Majiwada, Thane",
  },
  {
    title: "Haldi Ceremony",
    date: "Tuesday, June 23, 2026",
    time: "7:00 PM Onwards",
    venue: "Param Banquet, Sainath Nagar, Majiwada, Thane",
  },
  {
    title: "Wedding",
    date: "Tuesday, June 23, 2026",
    time: "7:00 PM Onwards",
    venue: "Mahajan Grand Banquet, Sainath Nagar, Majiwada, Thane",
  },
  {
    title: "Reception",
    date: "Tuesday, June 23, 2026",
    time: "8:30 PM Onwards",
    venue: "Mahajan Grand Banquet, Sainath Nagar, Majiwada, Thane",
  },
];

export function EventsSection() {
  return (
    <section className="w-full py-12 px-6 flex flex-col items-center" style={{ background: TEAL }}>
      {/* Section heading */}
      <div className="flex flex-col items-center mb-4">
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
          className="uppercase tracking-[2.88px] text-black text-center mt-2"
          style={{ fontFamily: "'EB Garamond', serif", fontSize: 36, fontWeight: 700 }}
        >
          EVENTS
        </p>
      </div>

      {/* Cards */}
      <div className="w-full flex flex-col gap-20 pb-12">
        {EVENTS.map((ev) => (
          <EventCard key={ev.title} event={ev} />
        ))}
      </div>
    </section>
  );
}
