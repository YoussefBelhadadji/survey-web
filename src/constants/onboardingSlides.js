// ─────────────────────────────────────────
// constants/onboardingSlides.js
// Multilingual onboarding slides for Intima Care
// ─────────────────────────────────────────

export const ONBOARDING_SLIDES = [
  {
    id: 1,
    visual: "image1",
    imageUrl: "https://i.pinimg.com/1200x/ef/bf/07/efbf07ff7573fc482726f383169d3d1e.jpg",
    badge: { icon: "🌱", labelKey: "badge1Label", valueKey: "badge1Value" },
    titleKey: "slide1Title",
    subtitleKey: "slide1Subtitle",
    ctaKey: "next",
  },
  {
    id: 2,
    visual: "image2",
    imageUrl: "https://i.pinimg.com/1200x/09/8b/cb/098bcb27b47e6325bb85042afc7b7352.jpg",
    badge: null,
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
    ctaKey: "next",
  },
  {
    id: 3,
    visual: "image3",
    imageUrl: "/image.png",
    badge: null,
    titleKey: "slide3Title",
    subtitleKey: null,
    ctaKey: "getStarted",
  },
];

export const ONBOARDING_I18N = {
  ar: {
    skip:         "تخطي",
    next:         "التالي →",
    getStarted:   "ابدأ الآن →",
    badge1Label:  "الصحة النفسية",
    badge1Value:  "متجددة",
    slide1Title:  "مساحة آمنة لأفكارك ومشاعرك.",
    slide1Subtitle: "اكتشف ممارسات واعية في بيئة مصممة لصحتك العاطفية والزوجية.",
    slide2Title:  "افهم علاقتك بشكل أعمق.",
    slide2Subtitle: "ابدأ رحلتك نحو الوضوح العاطفي وروابط أكثر عمقاً مع شريكك.",
    slide3Title:  "استشارات الزواج والعلاقات",
  },
  fr: {
    skip:         "Passer",
    next:         "Suivant →",
    getStarted:   "Commencer →",
    badge1Label:  "BIEN-ÊTRE",
    badge1Value:  "Restauré",
    slide1Title:  "Un espace sûr pour vos pensées et émotions.",
    slide1Subtitle: "Explorez des pratiques conscientes dans un espace conçu pour votre bien-être émotionnel.",
    slide2Title:  "Comprenez mieux votre relation.",
    slide2Subtitle: "Commencez votre voyage vers la clarté émotionnelle et des liens plus profonds.",
    slide3Title:  "Conseil en mariage et en relations",
  },
  en: {
    skip:         "Skip",
    next:         "Next →",
    getStarted:   "Get Started →",
    badge1Label:  "MENTAL CLARITY",
    badge1Value:  "Restored",
    slide1Title:  "A safe space for your thoughts and feelings.",
    slide1Subtitle: "Explore mindful practices in a space designed for your emotional well-being.",
    slide2Title:  "Understand your relationship better.",
    slide2Subtitle: "Begin your journey towards emotional clarity and deeper connections.",
    slide3Title:  "Marriage and Relationship Counselling",
  },
};
