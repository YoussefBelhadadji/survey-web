import { DOCTORS } from "../constants/doctors";
import ar from "../i18n/locales/ar";
import en from "../i18n/locales/en";
import fr from "../i18n/locales/fr";

const LOCALES = [ar, en, fr];
const WORST_OPTION_INDEX = 2;

const QUESTION_THEMES = {
  engaged_q2:  ["anxiety"],
  engaged_q4:  ["anxiety", "depression"],
  engaged_q10: ["trauma", "anxiety"],
  engaged_q13: ["behavior"],
  engaged_q14: ["behavior", "anxiety"],
  engaged_q16: ["trauma"],
  married_q2:  ["anxiety"],
  married_q3:  ["trauma", "depression"],
  married_q9:  ["depression", "anxiety"],
  married_q12: ["anxiety", "behavior"],
  married_q14: ["depression"],
  married_q16: ["depression"],
  married_q17: ["behavior"],
  married_q18: ["eating"],
  married_q19: ["depression", "behavior"],
  married_q20: ["depression"],
};

function isConcerningAnswer(questionId, answer) {
  if (!answer) return false;
  const prefix = questionId.startsWith("engaged_") ? "engaged" : "married";
  const worstLabels = LOCALES.map(
    (locale) => locale.likert[prefix].options[WORST_OPTION_INDEX]
  );
  return worstLabels.includes(answer);
}

function computeConcernScores(surveyAnswers) {
  const scores = { anxiety: 0, depression: 0, trauma: 0, eating: 0, behavior: 0 };

  for (const [qId, themes] of Object.entries(QUESTION_THEMES)) {
    if (!isConcerningAnswer(qId, surveyAnswers?.[qId])) continue;
    for (const theme of themes) scores[theme] += 1;
  }

  return scores;
}

export function rankDoctors(surveyAnswers = {}) {
  const concerns = computeConcernScores(surveyAnswers);
  const hasConcerns = Object.values(concerns).some((v) => v > 0);

  return [...DOCTORS]
    .map((doctor) => ({
      ...doctor,
      matchScore: hasConcerns ? (concerns[doctor.specialtyKey] ?? 0) : doctor.rating,
    }))
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return b.rating - a.rating;
    });
}

export function getInitials(name) {
  if (!name) return "?";
  const parts = name.replace(/^د\.\s*/, "").replace(/^Dr\.\s*/i, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
