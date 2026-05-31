// ─────────────────────────────────────────
// constants/surveyQuestions.js
// Survey tree — structure & navigation only.
// All display text lives in i18n/locales/*.js
// ─────────────────────────────────────────

export const Q_TYPE = {
  SINGLE_CARD:  "single_card",
  SINGLE_RADIO: "single_radio",
  LIKERT:       "likert",
};

export const SECTION = {
  STATUS:       "status",
  DEMOGRAPHICS: "demographics",
  ENGAGED:      "engaged",
  MARRIED:      "married",
};

// ── Static question structure (no text) ──
export const QUESTIONS = [
  {
    id: "q_status",
    section: SECTION.STATUS,
    type: Q_TYPE.SINGLE_CARD,
    optionValues: ["married", "engaged"],
    optionIcons:  { married: "/wedding-rings.png", engaged: "/ring.png" },
    next: { married: "q_gender", engaged: "q_gender" },
  },
  {
    id: "q_gender",
    section: SECTION.DEMOGRAPHICS,
    type: Q_TYPE.SINGLE_CARD,
    optionValues: ["male", "female"],
    next: "q_age",
  },
  {
    id: "q_age",
    section: SECTION.DEMOGRAPHICS,
    type: Q_TYPE.SINGLE_RADIO,
    optionValues: ["20_25", "26_30", "31_35", "35plus"],
    next: "q_education",
  },
  {
    id: "q_education",
    section: SECTION.DEMOGRAPHICS,
    type: Q_TYPE.SINGLE_RADIO,
    optionValues: ["primary", "secondary", "university", "masters", "phd"],
    next: "q_work",
  },
  {
    id: "q_work",
    section: SECTION.DEMOGRAPHICS,
    type: Q_TYPE.SINGLE_RADIO,
    optionValues: ["employed", "unemployed", "student"],
    next: "q_engagement_duration",
  },
  {
    id: "q_engagement_duration",
    section: SECTION.DEMOGRAPHICS,
    type: Q_TYPE.SINGLE_RADIO,
    optionValues: ["less_6m", "6m_1y", "more_1y"],
    // branches on q_status answer — resolved in resolveNext()
    next: { engaged: "engaged_q1", married: "married_q1" },
  },

  // ── Engaged questionnaire (18 questions) ──
  ...buildLikertStructure("engaged", 18),

  // ── Married questionnaire (20 questions) ──
  ...buildLikertStructure("married", 20),
];

function buildLikertStructure(prefix, count) {
  return Array.from({ length: count }, (_, i) => ({
    id:      `${prefix}_q${i + 1}`,
    section: prefix === "engaged" ? SECTION.ENGAGED : SECTION.MARRIED,
    type:    Q_TYPE.LIKERT,
    index:   i,          // used to look up text in locale
    prefix,              // "engaged" | "married"
    next:    i === count - 1 ? "__done__" : `${prefix}_q${i + 2}`,
  }));
}

// ── O(1) lookup map ───────────────────────
export const QUESTION_MAP = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q])
);

// ── Navigation resolver ───────────────────
export function resolveNext(question, answer, answers) {
  const { next } = question;
  if (!next || next === "__done__") return null;
  if (typeof next === "string") return next;

  if (question.id === "q_engagement_duration") {
    return next[answers.q_status] ?? null;
  }
  return next[answer] ?? null;
}

// ── Build translated options for a question ─
export function getOptions(question, t) {
  if (question.type === Q_TYPE.LIKERT) {
    const opts = t.likert[question.prefix].options;
    return opts.map((label) => ({ value: label, label }));
  }
  const tq = t.questions[question.id];
  return question.optionValues.map((val) => ({
    value: val,
    label: tq.options[val] ?? val,
    icon:  question.optionIcons?.[val],
  }));
}

// ── Get translated question text ──────────
export function getQuestionText(question, t, answers) {
  if (question.type === Q_TYPE.LIKERT) {
    return t.likert[question.prefix].questions[question.index];
  }
  const tq = t.questions[question.id];
  if (question.id === "q_engagement_duration") {
    return answers?.q_status === "married" ? tq.text_married : tq.text_engaged;
  }
  return tq.text;
}

export function getQuestionSubtitle(question, t) {
  if (question.type === Q_TYPE.LIKERT) return null;
  return t.questions[question.id]?.subtitle ?? null;
}
