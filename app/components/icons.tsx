import type { IkonNamn } from "../lib/data";

type P = { size?: number; className?: string };
const base = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
});

export function TjanstIkon({ namn, size = 26 }: { namn: IkonNamn; size?: number }) {
  switch (namn) {
    case "dack":
      return (
        <svg {...base(size)}>
          <circle cx="12" cy="12" r="9.2" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="12" cy="12" r="1.2" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1="12" y1="7.8" x2="12" y2="2.8" transform={`rotate(${a} 12 12)`} strokeWidth="1.2" />
          ))}
        </svg>
      );
    case "hotell":
      return (
        <svg {...base(size)}>
          <path d="M3 21V9l9-5 9 5v12" />
          <path d="M3 21h18" />
          <circle cx="8.5" cy="16.5" r="2.6" />
          <circle cx="15.5" cy="16.5" r="2.6" />
          <path d="M7 10.5h10" />
        </svg>
      );
    case "olja":
      return (
        <svg {...base(size)}>
          <path d="M12 3c3.5 4.6 5.6 7.8 5.6 10.4A5.6 5.6 0 0 1 6.4 13.4C6.4 10.8 8.5 7.6 12 3Z" />
          <path d="M9.4 14.2a2.7 2.7 0 0 0 2.6 2.4" />
        </svg>
      );
    case "inst":
      return (
        <svg {...base(size)}>
          <circle cx="12" cy="12" r="8.6" />
          <path d="M12 3.4v3M12 17.6v3M3.4 12h3M17.6 12h3" />
          <path d="m12 12 4-4" />
          <circle cx="12" cy="12" r="1.4" />
        </svg>
      );
    case "broms":
      return (
        <svg {...base(size)}>
          <circle cx="12" cy="12" r="8.4" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M5.2 6.6a9 9 0 0 1 4-2.6l1.2 3.4a5 5 0 0 0-2.4 1.6Z" fill="currentColor" fillOpacity=".25" />
          {[45, 135, 225, 315].map((a) => (
            <circle key={a} cx="12" cy="6.4" r=".7" transform={`rotate(${a} 12 12)`} fill="currentColor" />
          ))}
        </svg>
      );
    case "tryck":
      return (
        <svg {...base(size)}>
          <path d="M4.2 16.5a8.6 8.6 0 1 1 15.6 0" />
          <path d="m12 13 4.2-4.6" />
          <circle cx="12" cy="13.4" r="1.5" />
          <path d="M7 19.6h10" />
        </svg>
      );
  }
}

export const IconArrow = ({ size = 16, className = "arrow" }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconPhone = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const IconPin = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const IconClock = ({ size = 18 }: P) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconMail = ({ size = 18 }: P) => (
  <svg {...base(size)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconUser = ({ size = 18 }: P) => (
  <svg {...base(size)}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
export const IconStar = ({ size = 15 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8Z" /></svg>
);
export const IconCar = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3H3z" /><circle cx="7.5" cy="13.5" r="1" /><circle cx="16.5" cy="13.5" r="1" /></svg>
);
export const IconGrid = ({ size = 18 }: P) => (
  <svg {...base(size)}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
);
export const IconCalendar = ({ size = 18 }: P) => (
  <svg {...base(size)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
);
export const IconLogout = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11" /></svg>
);
export const IconShield = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconBell = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4Z" /><path d="M10 21h4" /></svg>
);
export const IconMenu = ({ open }: { open: boolean }) => (
  <svg {...base(22)} strokeWidth={2}>
    {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M10 17h10" />}
  </svg>
);
export const IconPlus = ({ size = 16 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>
);
