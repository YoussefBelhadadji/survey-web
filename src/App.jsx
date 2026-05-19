// ─────────────────────────────────────────
// App.jsx
// Screen router — manages which page shows
// ─────────────────────────────────────────

import { useState } from "react";

import SplashScreen      from "./pages/SplashScreen/SplashScreen";
import LanguageSelector  from "./pages/LanguageSelector/LanguageSelector";
import Onboarding        from "./pages/Onboarding/Onboarding";
import Survey            from "./pages/Survey/Survey";
import Home              from "./pages/Home/Home";

import "./styles/global.css";

// All possible screens in order
const SCREENS = {
  SPLASH:    "splash",
  LANGUAGE:  "language",
  ONBOARDING:"onboarding",
  SURVEY:    "survey",
  HOME:      "home",
};

export default function App() {
  const [screen, setScreen]           = useState(SCREENS.SPLASH);
  const [surveyAnswers, setSurveyAnswers] = useState({});

  const goTo = (target) => setScreen(target);

  return (
    <div className="app-shell">
      {screen === SCREENS.SPLASH     && <SplashScreen     onNext={() => goTo(SCREENS.LANGUAGE)}   />}
      {screen === SCREENS.LANGUAGE   && <LanguageSelector onNext={() => goTo(SCREENS.ONBOARDING)} />}
      {screen === SCREENS.ONBOARDING && <Onboarding       onFinish={() => goTo(SCREENS.SURVEY)}    />}
      {screen === SCREENS.SURVEY     && (
        <Survey onFinish={(ans) => { setSurveyAnswers(ans); goTo(SCREENS.HOME); }} />
      )}
      {screen === SCREENS.HOME       && <Home surveyAnswers={surveyAnswers} />}
    </div>
  );
}
