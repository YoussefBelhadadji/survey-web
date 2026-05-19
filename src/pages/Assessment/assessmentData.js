// ─────────────────────────────────────────
// Assessment/assessmentData.js
// FSFI (female) + IIEF (male) data
// ─────────────────────────────────────────
import fsfi from "../../../FSFI_trilingual_en_fr_ar.json";
import iief from "../../../IIEF_translated_ar_fr.json";

// Resolve options for a question (handles options_ref)
function resolveOptions(q, optionSets) {
  if (q.options) return q.options;
  if (q.options_ref) return optionSets[q.options_ref] ?? [];
  return [];
}

export function getFsfiQuestions(lang) {
  return fsfi.questions.map((q) => ({
    id:      q.id,
    domain:  q.domain,
    text:    q[lang] ?? q.en,
    options: resolveOptions(q, fsfi.option_sets).map((o) => ({
      score: o.score,
      label: o[lang] ?? o.en,
    })),
  }));
}

export function getIiefQuestions(lang) {
  return iief.questions.map((q) => ({
    id:      q.id,
    domain:  q.domain,
    text:    q[lang] ?? q.en,
    options: resolveOptions(q, iief.option_sets).map((o) => ({
      score: o.score,
      label: o[lang] ?? o.en,
    })),
  }));
}

// ── FSFI scoring ─────────────────────────
export function scoreFsfi(answers) {
  const domains = fsfi.scoring_system.domains;
  let total = 0;
  const domainScores = domains.map((d) => {
    const sum = d.questions.reduce((acc, qNum) => {
      const val = answers[`Q${qNum}`] ?? 0;
      return acc + val;
    }, 0);
    const score = parseFloat((sum * d.factor).toFixed(1));
    total += score;
    return {
      key:   d.domain,
      name:  d.name,
      score,
      max:   d.maximum_score,
      pct:   Math.round((score / d.maximum_score) * 100),
    };
  });
  return { total: parseFloat(total.toFixed(1)), maxTotal: 36, domains: domainScores };
}

// ── IIEF scoring ─────────────────────────
export function scoreIief(answers) {
  const domains = iief.clinical_application_guidelines.domains;
  let total = 0;
  const domainScores = domains.map((d) => {
    const sum = d.questions.reduce((acc, qId) => {
      return acc + (answers[qId] ?? 0);
    }, 0);
    total += sum;
    return {
      key:   d.code,
      name:  { en: d.name_en, fr: d.name_fr, ar: d.name_ar },
      score: sum,
      max:   d.max_score,
      pct:   Math.round((sum / d.max_score) * 100),
    };
  });
  return { total, maxTotal: 75, domains: domainScores };
}

// ── Wellness label ────────────────────────
export function getWellnessLabel(pct, lang) {
  const labels = {
    ar: pct >= 75 ? "ازدهار" : pct >= 50 ? "توازن" : "يحتاج اهتماماً",
    fr: pct >= 75 ? "Épanouissement" : pct >= 50 ? "Équilibre" : "Attention requise",
    en: pct >= 75 ? "Flourishing" : pct >= 50 ? "Balanced" : "Needs Attention",
  };
  return labels[lang] ?? labels.en;
}
