// ─────────────────────────────────────────
// components/Logo/Logo.jsx
// Sanctuary leaf logo
// ─────────────────────────────────────────

export default function Logo({ size = 52, color = "#6B4EFF" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Intima Care logo"
    >
      {/* Center leaf */}
      <path
        d="M26 8 C26 8 18 18 18 28 C18 34 21.5 38 26 40 C30.5 38 34 34 34 28 C34 18 26 8 26 8Z"
        fill={color}
      />
      {/* Left leaf */}
      <path
        d="M26 28 C26 28 14 22 10 30 C14 36 22 36 26 32"
        fill={color}
        opacity="0.75"
      />
      {/* Right leaf */}
      <path
        d="M26 28 C26 28 38 22 42 30 C38 36 30 36 26 32"
        fill={color}
        opacity="0.75"
      />
    </svg>
  );
}
