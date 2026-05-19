// ─────────────────────────────────────────
// Survey/components/CardGrid.jsx
// Big card grid — used for first questions (status, gender)
// ─────────────────────────────────────────
import styles from "./CardGrid.module.css";

export default function CardGrid({ options, selected, onSelect }) {
  return (
    <div className={styles.grid}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.card} ${selected === opt.value ? styles.active : ""}`}
          onClick={() => onSelect(opt.value)}
          aria-pressed={selected === opt.value}
        >
          <span className={styles.icon}>{opt.icon}</span>
          <span className={styles.label}>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
