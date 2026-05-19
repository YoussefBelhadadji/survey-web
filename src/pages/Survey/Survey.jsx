// ─────────────────────────────────────────
// pages/Survey/Survey.jsx
// ─────────────────────────────────────────
import { useCallback } from "react";
import styles from "./Survey.module.css";

import useSurvey from "./useSurvey";
import { useLocale } from "../../i18n/LocaleContext";
import {
  Q_TYPE,
  getOptions,
  getQuestionText,
  getQuestionSubtitle,
} from "../../constants/surveyQuestions";

import ProgressBar from "./components/ProgressBar";
import CardGrid    from "./components/CardGrid";
import RadioList   from "./components/RadioList";
import LikertScale from "./components/LikertScale";
import LangSwitcher from "./components/LangSwitcher";

export default function Survey({ onFinish }) {
  const { t } = useLocale();

  const {
    currentQuestion,
    answer,
    answers,
    history,
    canGoNext,
    select,
    goNext,
    goBack,
    progress,
  } = useSurvey();

  const handleNext = useCallback(() => {
    const nextId = goNext();
    if (nextId === null) onFinish(answers);
  }, [goNext, onFinish, answers]);

  if (!currentQuestion) return null;

  const isRtl       = t.dir === "rtl";
  const questionText = getQuestionText(currentQuestion, t, answers);
  const subtitle     = getQuestionSubtitle(currentQuestion, t);
  const options      = getOptions(currentQuestion, t);
  const sectionLabel = t.sections[currentQuestion.section] ?? "";

  return (
    <div
      className={`${styles.screen} page`}
      dir={t.dir}
      lang={t.lang}
    >
      {/* Top bar */}
      <header className={styles.header}>
        {/* Back arrow — flips with dir */}
        {history.length > 1 ? (
          <button
            className={styles.iconBtn}
            onClick={goBack}
            aria-label={t.ui.back}
          >
            {isRtl ? "→" : "←"}
          </button>
        ) : (
          <span className={styles.iconBtn} />
        )}

        <span className={styles.appName}>{t.ui.appName}</span>

        <div className={styles.headerEnd}>
          <LangSwitcher />
          <button
            className={styles.skipBtn}
            onClick={() => onFinish(answers)}
          >
            {t.ui.skip}
          </button>
        </div>
      </header>

      {/* Progress */}
      <ProgressBar
        current={progress.current}
        total={progress.total}
        label={sectionLabel}
        dir={t.dir}
      />

      {/* Question */}
      <main className={styles.main}>
        <h1 className={styles.questionText}>{questionText}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <div className={styles.optionsArea}>
          {currentQuestion.type === Q_TYPE.SINGLE_CARD && (
            <CardGrid options={options} selected={answer} onSelect={select} />
          )}
          {currentQuestion.type === Q_TYPE.SINGLE_RADIO && (
            <RadioList options={options} selected={answer} onSelect={select} />
          )}
          {currentQuestion.type === Q_TYPE.LIKERT && (
            <LikertScale options={options} selected={answer} onSelect={select} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <button
          className={`${styles.nextBtn} ${canGoNext ? styles.nextActive : ""}`}
          onClick={handleNext}
          disabled={!canGoNext}
        >
          {t.ui.next} {isRtl ? "←" : "→"}
        </button>
        {history.length > 1 && (
          <button className={styles.backTextBtn} onClick={goBack}>
            {isRtl ? "→" : "←"} {t.ui.back}
          </button>
        )}
      </footer>
    </div>
  );
}
