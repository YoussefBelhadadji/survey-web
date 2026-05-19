// ─────────────────────────────────────────
// Survey/components/LangSwitcher.jsx
// ─────────────────────────────────────────
import { useLocale } from "../../../i18n/LocaleContext";
import styles from "./LangSwitcher.module.css";

const LANGS = [
  { code: "ar", label: "ع" },
  { code: "fr", label: "Fr" },
  { code: "en", label: "En" },
];

export default function LangSwitcher() {
  const { lang, setLang } = useLocale();

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          className={`${styles.btn} ${lang === code ? styles.active : ""}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
