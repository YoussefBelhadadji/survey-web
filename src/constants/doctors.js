export const DOCTORS = [
  {
    id: "mohamed",
    name: { ar: "د. محمد بن علي", en: "Dr. Mohamed Ben Ali", fr: "Dr. Mohamed Ben Ali" },
    specialty: {
      ar: "القلق والتوتر",
      en: "Anxiety & Stress",
      fr: "Anxiété et stress",
    },
    specialtyKey: "anxiety",
    rating: 4.8,
    slots: ["09:00", "11:00", "15:00"],
    photo: null,
  },
  {
    id: "ali",
    name: { ar: "د. علي قدور", en: "Dr. Ali Kaddour", fr: "Dr. Ali Kaddour" },
    specialty: {
      ar: "الاكتئاب واضطرابات المزاج",
      en: "Depression & Mood Disorders",
      fr: "Dépression et troubles de l'humeur",
    },
    specialtyKey: "depression",
    rating: 4.5,
    slots: ["10:00", "14:00"],
    photo: null,
  },
  {
    id: "yasmine",
    name: { ar: "د. ياسمين حمدي", en: "Dr. Yasmine Hamdi", fr: "Dr. Yasmine Hamdi" },
    specialty: {
      ar: "الصدمات النفسية واضطراب ما بعد الصدمة",
      en: "Trauma & PTSD",
      fr: "Traumatismes et TSPT",
    },
    specialtyKey: "trauma",
    rating: 4.9,
    slots: ["08:30", "13:00", "16:00"],
    photo: null,
  },
  {
    id: "sara",
    name: { ar: "د. سارة منصور", en: "Dr. Sara Mansour", fr: "Dr. Sara Mansour" },
    specialty: {
      ar: "اضطرابات الأكل والصورة الذاتية",
      en: "Eating Disorders & Body Image",
      fr: "Troubles alimentaires et image corporelle",
    },
    specialtyKey: "eating",
    rating: 4.3,
    slots: ["09:30", "12:00"],
    photo: null,
  },
  {
    id: "karim",
    name: { ar: "د. كريم عيسى", en: "Dr. Karim Issa", fr: "Dr. Karim Issa" },
    specialty: {
      ar: "إدمان ومشاكل السلوك",
      en: "Addiction & Behavioral Issues",
      fr: "Addiction et troubles comportementaux",
    },
    specialtyKey: "behavior",
    rating: 4.6,
    slots: ["10:30", "15:30", "17:00"],
    photo: null,
  },
];

export const DOCTOR_MAP = Object.fromEntries(DOCTORS.map((d) => [d.id, d]));
