// ─────────────────────────────────────────
// i18n/locales/fr.js  — Français
// ─────────────────────────────────────────
export default {
  dir: "ltr",
  lang: "fr",

  ui: {
    appName: "Intima Care",
    skip: "Passer",
    next: "Suivant",
    back: "Retour",
    arrowNext: "→",
    arrowBack: "←",
  },

  sections: {
    status:       "Début",
    demographics: "Informations générales",
    engaged:      "Questionnaire — Futurs mariés",
    married:      "Questionnaire — Couples mariés",
  },

  questions: {
    q_status: {
      text: "Quelle est votre situation actuelle ?",
      subtitle: "Cela nous aidera à personnaliser le questionnaire adapté à votre profil.",
      options: {
        married: "Marié(e)",
        engaged: "Futur(e) marié(e)",
      },
    },
    q_gender: {
      text: "Genre",
      subtitle: null,
      options: { male: "Homme", female: "Femme" },
    },
    q_age: {
      text: "Âge",
      subtitle: null,
      options: {
        "20_25":  "20 - 25 ans",
        "26_30":  "26 - 30 ans",
        "31_35":  "31 - 35 ans",
        "35plus": "Plus de 35 ans",
      },
    },
    q_education: {
      text: "Niveau d'études",
      subtitle: "Cela nous aide à adapter le contenu à votre parcours.",
      options: {
        primary:    "Primaire",
        secondary:  "Secondaire",
        university: "Licence (Bac+3)",
        masters:    "Master (Bac+5)",
        phd:        "Doctorat",
      },
    },
    q_work: {
      text: "Situation professionnelle",
      subtitle: null,
      options: {
        employed:   "En activité",
        unemployed: "Sans emploi",
        student:    "Étudiant(e)",
      },
    },
    q_engagement_duration: {
      text_engaged: "Durée des fiançailles",
      text_married: "Durée du mariage",
      subtitle: null,
      options: {
        less_6m: "Moins de 6 mois",
        "6m_1y": "De 6 mois à 1 an",
        more_1y: "Plus d'un an",
      },
    },
  },

  likert: {
    engaged: {
      options: ["D'accord", "Neutre", "Pas d'accord"],
      questions: [
        "Je me sens psychologiquement prêt(e) à renoncer à une partie de ma liberté individuelle pour mon partenaire et pour fonder une famille.",
        "Je suis capable de maîtriser mes émotions (colère, anxiété) lors d'un désaccord avec l'autre partie.",
        "J'ai la capacité d'accepter les défauts de mon partenaire et de cohabiter avec eux sans chercher à le/la changer de force.",
        "Je comprends pleinement les changements psychologiques et les responsabilités éducatives liés à la parentalité.",
        "Nous avons discuté ensemble de nos ambitions futures (professionnelles et académiques) et avons trouvé une grande convergence.",
        "Nous sommes tout à fait d'accord sur les coutumes, traditions et valeurs religieuses et sociales que nous transmettrons à nos enfants.",
        "Je trouve qu'il existe un langage de dialogue commun et une aisance flexible dans l'échange d'idées avec l'autre partie.",
        "Nous nous ressemblons dans notre façon de gérer les loisirs, les activités et les relations sociales.",
        "Lorsque nous sommes en désaccord, nous nous concentrons sur la résolution du problème lui-même plutôt que sur les accusations mutuelles.",
        "Je trouve facile d'exprimer mes sentiments et mes préoccupations avec franchise, sans craindre les jugements hâtifs.",
        "L'autre partie fait preuve d'une flexibilité suffisante pour faire des concessions et trouver des compromis lorsque la situation l'exige.",
        "Nous préférons toujours résoudre nos problèmes et désaccords nous-mêmes, sans impliquer la famille ou des tiers.",
        "Les responsabilités financières (dépenses du foyer, épargne, urgences) ont été clairement définies et réparties entre nous.",
        "Nous sommes tout à fait d'accord sur notre mode de consommation et de dépenses (éviter le gaspillage, prioriser les besoins).",
        "La question du travail de la femme et de sa contribution financière au foyer (ou non) est réglée et convenue entre nous.",
        "Il existe une acceptation mutuelle, une harmonie et un respect clair entre moi et la famille de mon partenaire.",
        "Nous avons convenu de fixer des limites saines pour empêcher l'ingérence des proches dans les décisions importantes de notre vie privée.",
        "Nous nous accordons précisément sur la nature et l'étendue des relations et amitiés que nous maintiendrons après le mariage.",
      ],
    },
    married: {
      options: ["Toujours", "Parfois", "Rarement"],
      questions: [
        "Nous consacrons régulièrement du temps pour parler de notre quotidien et de nos émotions, loin des pressions du travail et des enfants.",
        "Mon partenaire m'écoute avec attention et respect mutuel lorsque j'exprime mon opinion ou mes préoccupations.",
        "Je me sens totalement à l'aise pour me confier à mon partenaire sur n'importe quel sujet, sans craindre les malentendus ou les reproches.",
        "Nous comprenons facilement les messages non verbaux de l'autre (langage corporel, regards).",
        "Mon partenaire évite le silence punitif ou l'ignorance prolongée en cas de désaccord.",
        "Nous prenons ensemble les décisions familiales importantes de manière équitable et consensuelle.",
        "Nous veillons à pratiquer des activités, loisirs ou centres d'intérêt communs pendant notre temps libre.",
        "Je me sens valorisé(e) et soutenu(e) émotionnellement et moralement par mon partenaire dans les moments difficiles.",
        "Nous échangeons quotidiennement des marques d'affection et de contact physique spontané (câlins, accolades).",
        "Un sentiment de flexibilité et de complémentarité règne entre nous dans la répartition des rôles et responsabilités au foyer.",
        "Lors d'un désaccord, nous nous concentrons sur le comportement problématique lui-même, sans ressortir les erreurs du passé.",
        "Nous maintenons le calme et évitons les cris, les blessures ou les accusations mutuelles lors des discussions tendues.",
        "Nous sommes capables de parvenir à une réconciliation et à des compromis satisfaisants pour les deux parties, sans chercher à « gagner ».",
        "Nous nous excusons clairement l'un envers l'autre lorsque l'un de nous réalise avoir blessé l'autre.",
        "Nous veillons à garder nos conflits entre nous et à ne pas impliquer la famille ou les enfants dans nos problèmes.",
        "Je me sens satisfait(e) et en harmonie avec la qualité et la fréquence de notre relation intime.",
        "Nous discutons de nos besoins et désirs intimes avec franchise et maturité, sans honte ni culpabilité.",
        "Nous acceptons les changements physiques ou les périodes de baisse de désir (maladie, fatigue) avec compréhension et bienveillance.",
        "Nous coopérons pour surmonter tout refroidissement ou problème ponctuel dans notre relation intime, plutôt que de l'éviter.",
        "Notre relation intime répond à mes attentes et contribue clairement à renforcer notre lien affectif.",
      ],
    },
  },
};
