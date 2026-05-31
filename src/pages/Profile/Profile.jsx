import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useLocale } from "../../i18n/LocaleContext";
import { getInitials } from "../../utils/doctorMatching";

const STORAGE_KEY = "intima_profile";

const DEFAULT_PROFILE = {
  firstName: "",
  lastName: "",
  age: "",
  maritalStatus: "single",
  gender: "male",
  photo: null,
};

const LANGS = [
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : { ...DEFAULT_PROFILE };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export default function Profile({ onBack }) {
  const { t, lang, setLang } = useLocale();
  const fileRef = useRef(null);
  const [profile, setProfile] = useState(loadProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  function update(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
    setSaved(false);
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const displayName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "?";
  const initials = getInitials(displayName === "?" ? "User" : displayName);

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>
      <header className={styles.header}>
        {onBack && (
          <button
            className={styles.backBtn}
            onClick={onBack}
            aria-label={t.ui.back}
          >
            {t.dir === "rtl" ? "→" : "←"}
          </button>
        )}
        <h1 className={styles.title}>{t.profile.title}</h1>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.profile.personalInfo}</h2>

          <div className={styles.photoRow}>
            {profile.photo ? (
              <img src={profile.photo} alt="" className={styles.avatar} />
            ) : (
              <div className={styles.avatarFallback}>{initials}</div>
            )}
            <div>
              <p className={styles.photoLabel}>{t.profile.photo}</p>
              <button className={styles.uploadBtn} onClick={() => fileRef.current?.click()}>
                {t.profile.uploadPhoto}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handlePhoto}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="firstName">{t.profile.firstName}</label>
            <input
              id="firstName"
              type="text"
              value={profile.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName">{t.profile.lastName}</label>
            <input
              id="lastName"
              type="text"
              value={profile.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="age">{t.profile.age}</label>
            <input
              id="age"
              type="number"
              min="1"
              max="120"
              value={profile.age}
              onChange={(e) => update("age", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="marital">{t.profile.maritalStatus}</label>
            <select
              id="marital"
              value={profile.maritalStatus}
              onChange={(e) => update("maritalStatus", e.target.value)}
            >
              <option value="single">{t.profile.marital.single}</option>
              <option value="married">{t.profile.marital.married}</option>
              <option value="divorced">{t.profile.marital.divorced}</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="gender">{t.profile.gender}</label>
            <select
              id="gender"
              value={profile.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="male">{t.profile.genders.male}</option>
              <option value="female">{t.profile.genders.female}</option>
            </select>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            {saved ? t.profile.saved : t.profile.save}
          </button>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.profile.language}</h2>
          <div className={styles.langRow}>
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                className={`${styles.langBtn} ${lang === code ? styles.langActive : ""}`}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.about}>
          <h2 className={styles.aboutTitle}>{t.profile.about}</h2>
          <div className={styles.aboutRow}>
            <span>{t.profile.developer}</span>
            <span>{t.profile.developerName}</span>
          </div>
          <div className={styles.aboutRow}>
            <span>{t.profile.version}</span>
            <span>1.0</span>
          </div>
          <div className={styles.aboutRow}>
            <span>{t.profile.year}</span>
            <span>2025 / 2026</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export { loadProfile, STORAGE_KEY };
