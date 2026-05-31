// ─────────────────────────────────────────
// pages/Home/Home.jsx
// ─────────────────────────────────────────
import { useState } from "react";
import styles from "./Home.module.css";
import { useLocale } from "../../i18n/LocaleContext";
import useRotatingQuote from "../../hooks/useRotatingQuote";
import AssessmentFlow from "../Assessment/AssessmentFlow";
import DoctorsList from "../Doctors/DoctorsList";
import Booking from "../Booking/Booking";
import Profile, { loadProfile } from "../Profile/Profile";

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

function defaultUserName(gender) {
  return gender === "female" ? "Marwa" : "Ali";
}

function HomeDashboard({ lang, t, mood, setMood, setScreen, setActiveTab, surveyAnswers }) {
  const profile = loadProfile();
  const quote = useRotatingQuote(lang);
  const gender = surveyAnswers?.q_gender || profile.gender || "male";
  const userName = profile.firstName || defaultUserName(gender);
  const greeting = { ar: "صباح الخير", fr: "Bonjour", en: "Good morning" }[lang] ?? "Good morning";
  const subtitle  = { ar: "كيف حالك اليوم؟", fr: "Comment vous sentez-vous ?", en: "How are you feeling today?" }[lang];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <p className={styles.appBrand}>
              <span className={styles.brandDot}>✦</span> Intima Care
            </p>
          </div>
          <button
            className={styles.avatar}
            onClick={() => setActiveTab("profile")}
            aria-label="profile"
          >
            {profile.photo
              ? <img src={profile.photo} alt="" className={styles.avatarImg} />
              : "👤"}
          </button>
        </div>
        <h1 className={styles.greeting}>{greeting}, {userName}</h1>
        <p className={styles.sub}>{subtitle}</p>
      </header>

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

      <div className={styles.grid}>
        {GRID_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.cell}
            style={{ "--cell-bg": item.color }}
            onClick={() => {
              if (item.id === "assessment") setScreen("assessment");
              if (item.id === "privacy") setActiveTab("profile");
            }}
          >
            <span className={styles.cellIcon}>{item.icon}</span>
            <span className={styles.cellLabel}>{item.label[lang] ?? item.label.en}</span>
          </button>
        ))}
      </div>

      <blockquote className={styles.quote} key={quote.id}>
        <p className={styles.quoteTag}>{t.ui.dailyQuote}</p>
        <p className={styles.quoteText}>{quote.text}</p>
        <p className={styles.quoteAuthor}>{quote.author}</p>
      </blockquote>
    </>
  );
}

const NAV = [
  { id: "home",     icon: "🧘", label: { ar: "تأمل",    fr: "Reflect",  en: "Reflect"  } },
  { id: "sessions", icon: "📅", label: { ar: "جلسات",   fr: "Sessions", en: "Sessions" } },
  { id: "library",  icon: "📚", label: { ar: "مكتبة",   fr: "Library",  en: "Library"  } },
  { id: "profile",  icon: "👤", label: { ar: "ملفي",    fr: "Profil",   en: "Profile"  } },
];

export default function Home({ surveyAnswers }) {
  const { t, lang } = useLocale();
  const [mood, setMood]           = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [screen, setScreen]       = useState("main");
  const [bookingDoctorId, setBookingDoctorId] = useState(null);

  if (screen === "assessment") {
    return <AssessmentFlow gender={surveyAnswers?.q_gender} onBack={() => setScreen("main")} />;
  }

  if (bookingDoctorId) {
    return (
      <Booking
        doctorId={bookingDoctorId}
        onBack={() => setBookingDoctorId(null)}
      />
    );
  }

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>
      {activeTab === "home" && (
        <HomeDashboard
          lang={lang}
          t={t}
          mood={mood}
          setMood={setMood}
          setScreen={setScreen}
          setActiveTab={setActiveTab}
          surveyAnswers={surveyAnswers}
        />
      )}

      {activeTab === "sessions" && (
        <DoctorsList
          surveyAnswers={surveyAnswers}
          onBook={setBookingDoctorId}
        />
      )}

      {activeTab === "profile" && (
        <Profile onBack={() => setActiveTab("home")} />
      )}

      {activeTab === "library" && (
        <div className={styles.placeholder}>
          <p>{NAV[2].label[lang] ?? NAV[2].label.en}</p>
        </div>
      )}

      <nav className={styles.nav} aria-label="navigation">
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.navActive : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label[lang] ?? item.label.en}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
