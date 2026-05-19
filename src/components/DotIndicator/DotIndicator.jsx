// ─────────────────────────────────────────
// components/DotIndicator/DotIndicator.jsx
// Step progress dots
// ─────────────────────────────────────────

export default function DotIndicator({ total, current }) {
  return (
    <div className="dots">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`dot ${i === current ? "dot--active" : ""}`}
        />
      ))}
    </div>
  );
}
