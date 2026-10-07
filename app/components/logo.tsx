import { useId } from "react";

/** IronDäck-emblem: däck med mönsterklackar och glödande nav. */
export function LogoMark({ className = "logo-mark" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const lugs = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6b2c" />
          <stop offset="1" stopColor="#e2401f" />
        </linearGradient>
        <radialGradient id={`h${id}`}>
          <stop offset="0" stopColor="#ffad4a" />
          <stop offset="1" stopColor="#e2401f" />
        </radialGradient>
      </defs>
      <g className="spin-on-hover">
        {lugs.map((a) => (
          <rect key={a} x="21.5" y="1.5" width="5" height="6" rx="1" fill="#f3efe9" opacity=".9" transform={`rotate(${a} 24 24)`} />
        ))}
        <circle cx="24" cy="24" r="17.5" fill="#141416" stroke="#f3efe9" strokeWidth="2.2" />
        <circle cx="24" cy="24" r="11" fill="none" stroke={`url(#g${id})`} strokeWidth="2.6" />
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x="23" y="13.8" width="2" height="6" rx="1" fill={`url(#g${id})`} transform={`rotate(${a} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="3.6" fill={`url(#h${id})`} />
    </svg>
  );
}

/** Stort dekorativt däck (används som bakgrund i hero). */
export function TireArt({ className }: { className?: string }) {
  const lugs = Array.from({ length: 36 }, (_, i) => i * 10);
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true" fill="none" stroke="#f3efe9">
      {lugs.map((a) => (
        <path key={a} d="M190 6h20l-4 22h-12z" fill="#f3efe9" stroke="none" transform={`rotate(${a} 200 200)`} />
      ))}
      <circle cx="200" cy="200" r="168" strokeWidth="6" />
      <circle cx="200" cy="200" r="120" strokeWidth="2" />
      <circle cx="200" cy="200" r="104" strokeWidth="1" strokeDasharray="3 7" />
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M188 110 L212 110 L206 170 L194 170 Z" fill="#f3efe9" stroke="none" transform={`rotate(${a} 200 200)`} />
      ))}
      <circle cx="200" cy="200" r="32" strokeWidth="5" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx="200" cy="178" r="4" fill="#f3efe9" stroke="none" transform={`rotate(${a + 36} 200 200)`} />
      ))}
    </svg>
  );
}
