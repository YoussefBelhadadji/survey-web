// ─────────────────────────────────────────
// Survey/useSurvey.js
// Survey engine — navigation & answers only
// ─────────────────────────────────────────
import { useState, useCallback } from "react";
import { QUESTION_MAP, resolveNext } from "../../constants/surveyQuestions";

const FIRST_QUESTION = "q_status";

// Rough totals per path (demographics 6 + questionnaire)
const PATH_TOTAL = { engaged: 24, married: 26, default: 24 };

export default function useSurvey() {
  const [history, setHistory]   = useState([FIRST_QUESTION]);
  const [answers, setAnswers]   = useState({});

  const currentId       = history[history.length - 1];
  const currentQuestion = QUESTION_MAP[currentId];
  const answer          = answers[currentId] ?? null;

  const select = useCallback((value) => {
    setAnswers((prev) => ({ ...prev, [currentId]: value }));
  }, [currentId]);

  // Returns next question id, or null when survey is complete
  const goNext = useCallback(() => {
    if (!answer) return undefined;
    const nextId = resolveNext(currentQuestion, answer, answers);
    if (!nextId) return null; // __done__
    setHistory((h) => [...h, nextId]);
    return nextId;
  }, [answer, answers, currentQuestion]);

  const goBack = useCallback(() => {
    if (history.length <= 1) return;
    setHistory((h) => h.slice(0, -1));
  }, [history]);

  const status = answers.q_status;
  const total  = status ? (PATH_TOTAL[status] ?? PATH_TOTAL.default) : PATH_TOTAL.default;

  return {
    currentQuestion,
    answer,
    answers,
    history,
    canGoNext: answer !== null,
    select,
    goNext,
    goBack,
    progress: { current: history.length, total },
  };
}
