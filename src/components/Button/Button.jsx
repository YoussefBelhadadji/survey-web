// ─────────────────────────────────────────
// components/Button/Button.jsx
// Reusable button — variant: primary | ghost
// ─────────────────────────────────────────

import styles from "./Button.module.css";

export default function Button({ children, onClick, variant = "primary", className = "" }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
