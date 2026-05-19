// ─────────────────────────────────────────
// Assessment/AssessmentResult.jsx
// Result screen matching the design screenshot
// ─────────────────────────────────────────
import styles from "./AssessmentResult.module.css";
import { useLocale } from "../../i18n/LocaleContext";
import { getWellnessLabel } from "./assessmentData";

const DOMAIN_ICONS = {
  // FSFI
  desire:       "💜",
  arousal:      "✨",
  lubrication:  "💧",
  orgasm:       "🌸",
  satisfaction: "💗",
  pain:         "🛡️",
  // IIEF
  A: "⚡",
  B: "🌟",
  C: "💜",
  D: "💗",
  E: "✅",
};

export default function AssessmentResult({ result, onBack }) {
  const { t, lang } = useLocale();

  const scorePct  = Math.round((result.total / result.maxTotal) * 100);
  const wellness  = getWellnessLabel(scorePct, lang);

  const ui = {
    ar: {
      done:    "التقييم مكتمل",
      harmony: "تناسقك الداخلي",
      score:   "درجة الصحة",
      desc:    scorePct >= 75
        ? "ملفك الشخصي يشير إلى مستوى عالٍ من التناغم. أنت في مرحلة الازدهار."
        : scorePct >= 50
        ? "هناك توازن جيد مع بعض المجالات التي تستحق الاهتمام."
        : "بعض المجالات تحتاج إلى اهتمام ورعاية إضافية.",
      forward: "مسارك للأمام",
      rec1:    "جلسة تكامل عميق",
      rec1sub: "احجز جلسة لاستكشاف نتائجك بعمق.",
      rec2:    "ورشة التواصل",
      rec2sub: "طوّر مهارات التعبير عن احتياجاتك.",
      book:    "احجز جلسة",
      share:   "شارك النتائج مع شريكك",
      back:    "العودة للرئيسية",
    },
    fr: {
      done:    "Évaluation complète",
      harmony: "Votre harmonie intérieure",
      score:   "Score bien-être",
      desc:    scorePct >= 75
        ? "Votre profil indique un niveau élevé d'harmonie. Vous êtes en phase d'épanouissement."
        : scorePct >= 50
        ? "Un bon équilibre avec quelques domaines à améliorer."
        : "Certains domaines nécessitent une attention particulière.",
      forward: "Votre chemin",
      rec1:    "Intégration profonde",
      rec1sub: "Réservez une session pour explorer vos résultats.",
      rec2:    "Atelier communication",
      rec2sub: "Développez vos compétences d'expression.",
      book:    "Réserver une session",
      share:   "Partager avec votre partenaire",
      back:    "Retour à l'accueil",
    },
    en: {
      done:    "Assessment Complete",
      harmony: "Your Inner Harmony",
      score:   "Wellness Score",
      desc:    scorePct >= 75
        ? "Your profile indicates a high level of resonance. You are in the Flourishing phase."
        : scorePct >= 50
        ? "Good balance with some areas worth attention."
        : "Some areas need additional care and attention.",
      forward: "Your Path Forward",
      rec1:    "Deep Dive Integration",
      rec1sub: "Schedule a session to unpack your results.",
      rec2:    "Mirroring Workshop",
      rec2sub: "Build skills for deeper vulnerability.",
      book:    "Book a Deep Dive Session",
      share:   "Share results with partner",
      back:    "Back to Home",
    },
  };

  const copy = ui[lang] ?? ui.en;

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>

      {/* Top badge */}
      <div className={styles.topBadge}>{copy.done}</div>

      {/* Title */}
      <h1 className={styles.mainTitle}>{copy.harmony}</h1>

      {/* Wellness badge */}
      <div className={styles.wellnessBadge}>
        <span className={styles.wellnessDot} />
        {wellness.toUpperCase()}
      </div>

      {/* Score circle */}
      <div className={styles.scoreCircle}>
        <svg viewBox="0 0 120 120" className={styles.ring}>
          <circle cx="60" cy="60" r="52" className={styles.ringBg} />
          <circle
            cx="60" cy="60" r="52"
            className={styles.ringFill}
            strokeDasharray={`${(scorePct / 100) * 327} 327`}
            strokeDashoffset="0"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className={styles.scoreInner}>
          <span className={styles.scoreNum}>{scorePct}</span>
          <span className={styles.scoreLabel}>{copy.score}</span>
        </div>
      </div>

      {/* Description */}
      <p className={styles.desc}>{copy.desc}</p>

      {/* Domain breakdown */}
      <div className={styles.domains}>
        {result.domains.map((d) => {
          const name = typeof d.name === "object" ? (d.name[lang] ?? d.name.en) : d.name;
          return (
            <div key={d.key} className={styles.domainCard}>
              <div className={styles.domainHeader}>
                <span className={styles.domainIcon}>{DOMAIN_ICONS[d.key] ?? "📊"}</span>
                <div className={styles.domainInfo}>
                  <span className={styles.domainName}>{name}</span>
                  <span className={styles.domainPct}>{d.pct}%</span>
                </div>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${d.pct}%`,
                    background: d.pct >= 70 ? "var(--color-brand)" : d.pct >= 40 ? "#F59E0B" : "#EF4444",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Path forward */}
      <div className={styles.pathSection}>
        <h2 className={styles.pathTitle}>{copy.forward}</h2>
        <div className={styles.rec}>
          <span className={styles.recNum}>1</span>
          <div>
            <p className={styles.recName}>{copy.rec1}</p>
            <p className={styles.recSub}>{copy.rec1sub}</p>
          </div>
        </div>
        <div className={styles.rec}>
          <span className={styles.recNum}>2</span>
          <div>
            <p className={styles.recName}>{copy.rec2}</p>
            <p className={styles.recSub}>{copy.rec2sub}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.bookBtn}>{copy.book}</button>
        <button className={styles.shareBtn}>{copy.share}</button>
        <button className={styles.backBtn} onClick={onBack}>{copy.back}</button>
      </div>

    </div>
  );
}
