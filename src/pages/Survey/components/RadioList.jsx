// ─────────────────────────────────────────
// Survey/components/RadioList.jsx
// Radio list with icon — matches second screenshot style
// ─────────────────────────────────────────
import styles from "./RadioList.module.css";

export default function RadioList({ options, selected, onSelect }) {
  return (
    <div className={styles.list}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.item} ${selected === opt.value ? styles.active : ""}`}
          onClick={() => onSelect(opt.value)}
          aria-pressed={selected === opt.value}
        >
          <span className={styles.radio}>
            {selected === opt.value && <span className={styles.radioDot} />}
          </span>
          <span className={styles.label}>{opt.label}</span>
          {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
        </button>
      ))}
    </div>
  );
}
