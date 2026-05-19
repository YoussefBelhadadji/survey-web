// ─────────────────────────────────────────
// Survey/components/LikertScale.jsx
// Horizontal option buttons for likert questions
// ─────────────────────────────────────────
import styles from "./LikertScale.module.css";

export default function LikertScale({ options, selected, onSelect }) {
  return (
    <div className={styles.wrapper}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.option} ${selected === opt.value ? styles.active : ""}`}
          onClick={() => onSelect(opt.value)}
          aria-pressed={selected === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
