// ─────────────────────────────────────────
// pages/LanguageSelector/LanguageSelector.jsx
// ─────────────────────────────────────────

import { LANGUAGES } from "../../constants/languages";
import { useLocale } from "../../i18n/LocaleContext";
import Button from "../../components/Button/Button";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector({ onNext }) {
  const { lang, setLang } = useLocale();

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className={styles.screen}>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Choose your <em>language</em>.
        </h1>
        <p className={styles.subtitle}>
          Select a language to personalize your experience.
        </p>
      </header>

      <ul className={styles.list} role="listbox" aria-label="Language options">
        {LANGUAGES.map((item) => {
          const isSelected = item.id === lang;
          return (
            <li
              key={item.id}
              role="option"
              aria-selected={isSelected}
              className={`${styles.item} ${isSelected ? styles.selected : ""}`}
              onClick={() => setLang(item.id)}
            >
              <span className={styles.flag} aria-hidden="true">
                {item.flagImg
                  ? <img src={item.flagImg} alt={item.label} className={styles.flagImg} />
                  : item.flag}
              </span>

              <div className={styles.info}>
                <span className={styles.langName}>{item.label}</span>
                <span className={styles.langDesc}>{item.description}</span>
              </div>

              <span className={styles.checkmark} aria-hidden="true">
                {isSelected && "✓"}
              </span>
            </li>
          );
        })}
      </ul>

      <footer className={styles.footer}>
        <Button onClick={handleContinue}>Continue →</Button>
        <p className={styles.privacy}>Intima Care • 2025</p>
      </footer>

    </div>
  );
}
