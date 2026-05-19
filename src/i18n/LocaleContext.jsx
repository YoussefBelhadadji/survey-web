// ─────────────────────────────────────────
// i18n/LocaleContext.jsx
// Global locale provider — wraps the whole app
// ─────────────────────────────────────────
import { createContext, useContext, useState } from "react";
import ar from "./locales/ar";
import fr from "./locales/fr";
import en from "./locales/en";

const LOCALES = { ar, fr, en };

const LocaleContext = createContext(null);

export function LocaleProvider({ children, initialLang = "ar" }) {
  const [lang, setLang] = useState(initialLang);
  const t = LOCALES[lang] ?? LOCALES.ar;

  return (
    <LocaleContext.Provider value={{ lang, setLang, t, locales: LOCALES }}>
      {children}
    </LocaleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
