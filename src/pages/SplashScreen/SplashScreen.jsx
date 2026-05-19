// ─────────────────────────────────────────
// pages/SplashScreen/SplashScreen.jsx
// First screen — logo + tagline + CTA
// ─────────────────────────────────────────

import Button from "../../components/Button/Button";
import DotIndicator from "../../components/DotIndicator/DotIndicator";
import Logo from "../../components/Logo/Logo";
import styles from "./SplashScreen.module.css";

export default function SplashScreen({ onNext }) {
  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <div className={styles.logoCard}>
          <Logo size={64} />
        </div>

        <div className={styles.text}>
          <h1 className={styles.title}>Intima Care</h1>
          <p className={styles.subtitle}>
            A safe space for your emotional and intimate wellness.
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <DotIndicator total={3} current={0} />
        <Button onClick={onNext} variant="ghost">
          BEGIN SESSION
        </Button>
      </div>
    </div>
  );
}
