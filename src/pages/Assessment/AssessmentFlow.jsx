// ─────────────────────────────────────────
// Assessment/AssessmentFlow.jsx
// Runs FSFI (female) or IIEF (male) questionnaire
// then shows Result screen
// ─────────────────────────────────────────
import { useState } from "react";
import { useLocale } from "../../i18n/LocaleContext";
import { getFsfiQuestions, getIiefQuestions, scoreFsfi, scoreIief } from "./assessmentData";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentResult   from "./AssessmentResult";
import styles from "./AssessmentFlow.module.css";

export default function AssessmentFlow({ gender, onBack }) {
  const { t, lang } = useLocale();
  const isFemale = gender === "female";

  const questions = isFemale ? getFsfiQuestions(lang) : getIiefQuestions(lang);

  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone]       = useState(false);
  const [result, setResult]   = useState(null);

  const current = questions[step];
  const answer  = answers[current?.id] ?? null;
  const total   = questions.length;

  const handleSelect = (score) => {
    setAnswers((prev) => ({ ...prev, [current.id]: score }));
  };

  const handleNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      const scored = isFemale ? scoreFsfi(answers) : scoreIief(answers);
      setResult(scored);
      setDone(true);
    }
  };

  const handleBack = () => {
    if (step === 0) { onBack(); return; }
    setStep((s) => s - 1);
  };

  if (done && result) {
    return <AssessmentResult result={result} isFemale={isFemale} onBack={onBack} />;
  }

  const pct = Math.round(((step + 1) / total) * 100);
  const isRtl = t.dir === "rtl";

  const title = {
    ar: isFemale ? "مؤشر الوظيفة الجنسية الأنثوية" : "المؤشر الدولي للوظيفة الانتصابية",
    fr: isFemale ? "FSFI" : "IIEF",
    en: isFemale ? "FSFI" : "IIEF",
  }[lang];

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack} aria-label="back">
          {isRtl ? "→" : "←"}
        </button>
        <span className={styles.title}>{title}</span>
        <span className={styles.counter}>{step + 1}/{total}</span>
      </header>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>

      {/* Question */}
      <AssessmentQuestion
        question={current}
        selected={answer}
        onSelect={handleSelect}
      />

      {/* Footer */}
      <footer className={styles.footer}>
        <button
          className={`${styles.nextBtn} ${answer !== null ? styles.active : ""}`}
          onClick={handleNext}
          disabled={answer === null}
        >
          {step < total - 1
            ? (isRtl ? `التالي ←` : `Next →`)
            : (isRtl ? `عرض النتيجة ←` : `See Results →`)}
        </button>
      </footer>
    </div>
  );
}
