// ─────────────────────────────────────────
// pages/Onboarding/Onboarding.jsx
// ─────────────────────────────────────────
import { useState } from "react";
import { ONBOARDING_SLIDES, ONBOARDING_I18N } from "../../constants/onboardingSlides";
import { useLocale } from "../../i18n/LocaleContext";
import Button from "../../components/Button/Button";
import DotIndicator from "../../components/DotIndicator/DotIndicator";
import styles from "./Onboarding.module.css";

// ── Slide visuals ─────────────────────────

function ImageVisual({ url }) {
  return (
    <img
      src={url}
      alt=""
      className={styles.slideImage}
      draggable={false}
    />
  );
}

function HeartVisual() {
  return (
    <div className={styles.heartVisual}>
      <div className={styles.heartCircle}>🤍</div>
      <div className={`${styles.heartChip} ${styles.topRight}`}>⭐</div>
      <div className={`${styles.heartChip} ${styles.bottomLeft}`}>🛡️</div>
    </div>
  );
}

// ── Main ──────────────────────────────────

export default function Onboarding({ onFinish }) {
  const { lang, t } = useLocale();
  const i18n = ONBOARDING_I18N[lang] ?? ONBOARDING_I18N.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const slide       = ONBOARDING_SLIDES[currentIndex];
  const isLast      = currentIndex === ONBOARDING_SLIDES.length - 1;
  const isRtl       = t.dir === "rtl";

  function handleNext() {
    isLast ? onFinish() : setCurrentIndex((p) => p + 1);
  }

  const ctaText = i18n[slide.ctaKey] ?? i18n.next;

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <span className={styles.appName}>Intima Care</span>
        <button className={styles.skipBtn} onClick={onFinish}>
          {i18n.skip}
        </button>
      </div>

      {/* Slide */}
      <div className={styles.slide} key={currentIndex}>

        {/* Visual card */}
        <div className={styles.visualCard}>
          {slide.imageUrl
            ? <ImageVisual url={slide.imageUrl} />
            : <HeartVisual />
          }

          {/* Floating badge */}
          {slide.badge && (
            <div className={`${styles.badge} ${isRtl ? styles.badgeRtl : styles.badgeLtr}`}>
              <div className={styles.badgeIcon}>{slide.badge.icon}</div>
              <div className={styles.badgeText}>
                <span className={styles.badgeLabel}>{i18n[slide.badge.labelKey]}</span>
                <span className={styles.badgeValue}>{i18n[slide.badge.valueKey]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Text */}
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{i18n[slide.titleKey]}</h2>
          {slide.subtitleKey && i18n[slide.subtitleKey] && (
            <p className={styles.subtitle}>{i18n[slide.subtitleKey]}</p>
          )}
        </div>

      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <DotIndicator total={ONBOARDING_SLIDES.length} current={currentIndex} />
        <Button onClick={handleNext}>{ctaText}</Button>
      </div>

    </div>
  );
}
