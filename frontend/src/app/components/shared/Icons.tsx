import svgPaths from "../../../imports/LandingScreen/svg-do8kux12on";
import { OLIVE } from "./Tokens";

export function ChevronDownIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <mask id="cal-mask" width="40" height="40" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
        <rect width="40" height="40" fill="#D9D9D9" />
      </mask>
      <g mask="url(#cal-mask)">
        <path d={svgPaths.pffca180} fill={OLIVE} />
      </g>
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <mask id="clock-mask" width="40" height="40" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
        <rect width="40" height="40" fill="#D9D9D9" />
      </mask>
      <g mask="url(#clock-mask)">
        <path d={svgPaths.p4768a00} fill={OLIVE} />
      </g>
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <mask id="pin-mask" width="40" height="40" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
        <rect width="40" height="40" fill="#D9D9D9" />
      </mask>
      <g mask="url(#pin-mask)">
        <path d={svgPaths.p22974980} fill={OLIVE} />
      </g>
    </svg>
  );
}

export function RadioButton({ selected }: { selected: boolean }) {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
      <rect x="0.5" y="0.5" width="26" height="26" rx="13" stroke="black" />
      {selected && <circle cx="13.5" cy="13.5" r="9.5" fill="black" />}
    </svg>
  );
}
