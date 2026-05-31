// ─────────────────────────────────────────
// Survey/components/CardGrid.jsx
// Big card grid — used for first questions (status, gender)
// ─────────────────────────────────────────
import styles from "./CardGrid.module.css";

function isImageIcon(icon) {
  return icon && (icon.startsWith("/") || /\.(png|jpe?g|webp|svg)$/i.test(icon));
}

function OptionIcon({ icon }) {
  if (!icon) return null;
  if (isImageIcon(icon)) {
    return <img src={icon} alt="" className={styles.iconImage} draggable={false} />;
  }
  return <span className={styles.icon}>{icon}</span>;
}

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
          <OptionIcon icon={opt.icon} />
          <span className={styles.label}>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
