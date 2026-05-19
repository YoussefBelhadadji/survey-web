// ─────────────────────────────────────────
// Assessment/AssessmentQuestion.jsx
// ─────────────────────────────────────────
import styles from "./AssessmentQuestion.module.css";

export default function AssessmentQuestion({ question, selected, onSelect }) {
  if (!question) return null;
  return (
    <main className={styles.main}>
      <h2 className={styles.text}>{question.text}</h2>
      <div className={styles.options}>
        {question.options.map((opt) => (
          <button
            key={opt.score}
            className={`${styles.option} ${selected === opt.score ? styles.active : ""}`}
            onClick={() => onSelect(opt.score)}
            aria-pressed={selected === opt.score}
          >
            <span className={styles.radio}>
              {selected === opt.score && <span className={styles.dot} />}
            </span>
            <span className={styles.label}>{opt.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
