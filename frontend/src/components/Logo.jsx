import React, { useState } from "react";

/**
 * Logo Dedari Store Bali.
 * Loads /logo.png (full logo with built-in brandmark + "DEDARI STORE BALI" text).
 * Falls back to inline SVG emblem + text if image fails.
 */
export function Logo({ size = 48, light = false }) {
  const [imgOk, setImgOk] = useState(true);
  const textColor = light ? "#FFFFFF" : "#1F3A5F";
  const taglineColor = light ? "rgba(255,255,255,0.7)" : "#3BAFA0";

  if (imgOk && !light) {
    return (
      <div className="flex items-center" data-testid="brand-logo">
        <img
          src="/logo.png"
          alt="Dedari Store Bali"
          onError={() => setImgOk(false)}
          className="object-contain block h-14 sm:h-20"
        />
      </div>
    );
  }

  // Fallback SVG + text
  return (
    <div className="flex items-center gap-3" data-testid="brand-logo-fallback">
      <div
        className="relative flex items-center justify-center rounded-full overflow-hidden flex-shrink-0"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #1F3A5F 0%, #3BAFA0 100%)",
          boxShadow: "0 2px 12px rgba(31, 58, 95, 0.18)",
        }}
      >
        <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none">
          <circle cx="32" cy="32" r="30" stroke="#E0A526" strokeWidth="1.5" opacity="0.6" />
          <path d="M32 14 L38 24 L32 22 L26 24 Z" fill="#E0A526" />
          <rect x="26" y="28" width="12" height="20" rx="2.5" fill="#FFFFFF" stroke="#E0A526" strokeWidth="1" />
          <circle cx="32" cy="44" r="1.2" fill="#E0A526" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className="font-extrabold tracking-tight"
          style={{ color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16 }}
        >
          DEDARI STORE
        </span>
        <span className="text-[10px] tracking-[0.25em] mt-1 font-semibold" style={{ color: taglineColor }}>
          BALI
        </span>
      </div>
    </div>
  );
}

export default Logo;
