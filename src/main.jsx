// ─────────────────────────────────────────
// main.jsx — App entry point
// ─────────────────────────────────────────

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LocaleProvider } from "./i18n/LocaleContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocaleProvider initialLang="ar">
      <App />
    </LocaleProvider>
  </StrictMode>
);
