// ─────────────────────────────────────────
// Survey/components/ProgressBar.jsx
// ─────────────────────────────────────────
import styles from "./ProgressBar.module.css";

export default function ProgressBar({ current, total, label, dir = "ltr" }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  const countText = dir === "rtl"
    ? `${current} / ${total}`
    : `${current} / ${total}`;
  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <span className={styles.label}>{label}</span>
        <span className={styles.count}>{countText}</span>
      </div>
      <div className={styles.track} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
