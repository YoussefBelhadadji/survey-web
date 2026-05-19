// ─────────────────────────────────────────
// pages/Home/Home.jsx
// ─────────────────────────────────────────
import { useState } from "react";
import styles from "./Home.module.css";
import { useLocale } from "../../i18n/LocaleContext";
import AssessmentFlow from "../Assessment/AssessmentFlow";

const MOODS = [
  { emoji: "😌", label: { ar: "هادئ",    fr: "Calme",    en: "Calm"      } },
  { emoji: "✨", label: { ar: "مبهج",    fr: "Joyeux",   en: "Joyful"    } },
  { emoji: "😴", label: { ar: "متعب",    fr: "Fatigué",  en: "Tired"     } },
  { emoji: "🌿", label: { ar: "متوازن",  fr: "Ancré",    en: "Grounded"  } },
  { emoji: "🌊", label: { ar: "منسجم",   fr: "En flow",  en: "Flow"      } },
];

const GRID_ITEMS = [
  { id: "home",       icon: "🏠", label: { ar: "الرئيسية",              fr: "Accueil",              en: "Home"              }, color: "#EDE9FF" },
  { id: "education",  icon: "📖", label: { ar: "التثقيف الجنسي",        fr: "Éducation sexuelle",   en: "Sex Education"     }, color: "#E8F4FF" },
  { id: "assessment", icon: "✅", label: { ar: "التقييم والاستبيانات",   fr: "Évaluation",           en: "Assessment"        }, color: "#E8FFE8" },
  { id: "relation",   icon: "💗", label: { ar: "العلاقة الزوجية",        fr: "Relation conjugale",   en: "Marital Relation"  }, color: "#FFE8F0" },
  { id: "guidance",   icon: "💬", label: { ar: "الإرشاد والنصائح",       fr: "Conseils",             en: "Guidance"          }, color: "#FFF3E8" },
  { id: "privacy",    icon: "🛡️", label: { ar: "حسابي والخصوصية",       fr: "Mon compte",           en: "My Account"        }, color: "#F0E8FF" },
];

const QUOTE = {
  text: "\"The curious paradox is that when I accept myself just as I am, then I can change.\"",
  author: "— Carl Rogers",
};

const NAV = [
  { icon: "🧘", label: { ar: "تأمل",    fr: "Reflect",  en: "Reflect"  }, active: true  },
  { icon: "📅", label: { ar: "جلسات",   fr: "Sessions", en: "Sessions" }, active: false },
  { icon: "📚", label: { ar: "مكتبة",   fr: "Library",  en: "Library"  }, active: false },
  { icon: "👤", label: { ar: "ملفي",    fr: "Profil",   en: "Profile"  }, active: false },
];

export default function Home({ surveyAnswers }) {
  const { t, lang } = useLocale();
  const [mood, setMood]           = useState(null);
  const [activeNav, setActiveNav] = useState(0);
  const [screen, setScreen]       = useState("home"); // "home" | "assessment"

  const isRtl = t.dir === "rtl";
  const greeting = { ar: "صباح الخير", fr: "Bonjour", en: "Good morning" }[lang] ?? "Good morning";
  const subtitle  = { ar: "كيف حالك اليوم؟", fr: "Comment vous sentez-vous ?", en: "How are you feeling today?" }[lang];

  if (screen === "assessment") {
    return <AssessmentFlow gender={surveyAnswers?.q_gender} onBack={() => setScreen("home")} />;
  }

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <p className={styles.appBrand}>
              <span className={styles.brandDot}>✦</span> Intima Care
            </p>
          </div>
          <div className={styles.avatar}>👤</div>
        </div>
        <h1 className={styles.greeting}>{greeting}, Alex</h1>
        <p className={styles.sub}>{subtitle}</p>
      </header>

      {/* Mood row */}
      <div className={styles.moodRow}>
        {MOODS.map((m, i) => (
          <button
            key={i}
            className={`${styles.moodBtn} ${mood === i ? styles.moodActive : ""}`}
            onClick={() => setMood(i)}
            aria-pressed={mood === i}
          >
            <span className={styles.moodEmoji}>{m.emoji}</span>
            <span className={styles.moodLabel}>{m.label[lang] ?? m.label.en}</span>
          </button>
        ))}
      </div>

      {/* 6-cell grid */}
      <div className={styles.grid}>
        {GRID_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.cell}
            style={{ "--cell-bg": item.color }}
            onClick={() => item.id === "assessment" && setScreen("assessment")}
          >
            <span className={styles.cellIcon}>{item.icon}</span>
            <span className={styles.cellLabel}>{item.label[lang] ?? item.label.en}</span>
          </button>
        ))}
      </div>

      {/* Daily quote */}
      <blockquote className={styles.quote}>
        <p className={styles.quoteTag}>DAILY QUOTE</p>
        <p className={styles.quoteText}>{QUOTE.text}</p>
        <p className={styles.quoteAuthor}>{QUOTE.author}</p>
      </blockquote>

      {/* Bottom nav */}
      <nav className={styles.nav} aria-label="navigation">
        {NAV.map((item, i) => (
          <button
            key={i}
            className={`${styles.navItem} ${activeNav === i ? styles.navActive : ""}`}
            onClick={() => setActiveNav(i)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label[lang] ?? item.label.en}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
