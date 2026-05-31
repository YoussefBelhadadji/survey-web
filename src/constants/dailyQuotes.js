export const DAILY_QUOTES = [
  {
    id: 1,
    tag: "marriage",
    ar: {
      text: "الزواج التعيس لا ينقصه الحب، تنقصه الصداقة.",
      author: "نيتشه",
    },
    fr: {
      text: "Un mariage malheureux ne manque pas d'amour, il manque d'amitié.",
      author: "Nietzsche",
    },
    en: {
      text: "An unhappy marriage is not lacking love, it is lacking friendship.",
      author: "Nietzsche",
    },
  },
  {
    id: 2,
    tag: "wisdom",
    ar: {
      text: "على الرجل أن يفتح عينيه جيداً قبل الزواج، وأن يغمضهما نصف إغماض بعده.",
      author: "مدام سكسوري",
    },
    fr: {
      text: "L'homme doit ouvrir grand les yeux avant le mariage, et les fermer à moitié après.",
      author: "Madame de Scudéry",
    },
    en: {
      text: "A man must keep his eyes wide open before marriage, and half-shut afterwards.",
      author: "Madame de Scudéry",
    },
  },
  {
    id: 3,
    tag: "family",
    ar: {
      text: "لا تتم السعادة في البيوت حتى يلين أحد الطرفين للآخر.",
      author: "نابليون بونابرت",
    },
    fr: {
      text: "Le bonheur ne s'accomplit dans les foyers que lorsque l'un des deux cède à l'autre.",
      author: "Napoléon Bonaparte",
    },
    en: {
      text: "Happiness in a home is only complete when one partner yields to the other.",
      author: "Napoleon Bonaparte",
    },
  },
  {
    id: 4,
    tag: "love",
    ar: {
      text: "أحببت زوجتي قبل أن أتزوجها، وتزوجتها لأنني أحببتها، وما زلت حتى اللحظة أحبها كما أحببتها قبل الزواج.",
      author: "طه حسين",
    },
    fr: {
      text: "J'ai aimé ma femme avant de l'épouser, je l'ai épousée parce que je l'aimais, et je l'aime encore autant qu'avant le mariage.",
      author: "Taha Hussein",
    },
    en: {
      text: "I loved my wife before I married her, I married her because I loved her, and I still love her as much as I did before marriage.",
      author: "Taha Hussein",
    },
  },
  {
    id: 5,
    tag: "marriage",
    ar: {
      text: "الزواج كالشجرة، جذورها: الحب، وتقبّل الطرف الآخر، والاحترام المتبادل، والثقة، والتضحية.",
      author: "إبراهيم الفقي",
    },
    fr: {
      text: "Le mariage est comme un arbre dont les racines sont : l'amour, l'acceptation de l'autre, le respect mutuel, la confiance et le sacrifice.",
      author: "Ibrahim Al-Faqqi",
    },
    en: {
      text: "Marriage is like a tree whose roots are: love, acceptance of the other, mutual respect, trust, and sacrifice.",
      author: "Ibrahim Al-Faqqi",
    },
  },
  {
    id: 6,
    tag: "love",
    ar: {
      text: "ينبغي للمرء أن يكون عاشقاً على الدوام، لذلك ينبغي له أن يتزوج.",
      author: "أوسكار وايلد",
    },
    fr: {
      text: "On devrait toujours être amoureux, c'est pourquoi on ne devrait jamais se marier.",
      author: "Oscar Wilde",
    },
    en: {
      text: "One should always be in love, that is the reason one should never marry.",
      author: "Oscar Wilde",
    },
  },
  {
    id: 7,
    tag: "wisdom",
    ar: {
      text: "النجاح في الزواج لا يحتاج إلى أن تتزوج الشخص الصحيح، بل أن تكون أنت الشخص الصحيح.",
      author: "حكمة غربية",
    },
    fr: {
      text: "Le succès en mariage ne dépend pas d'épouser la bonne personne, mais d'être soi-même la bonne personne.",
      author: "Sagesse occidentale",
    },
    en: {
      text: "The success of marriage comes not in finding the right person, but in being the right person.",
      author: "Western wisdom",
    },
  },
  {
    id: 8,
    tag: "family",
    ar: {
      text: "الأسرة هي المدرسة الأولى التي يتعلم فيها الإنسان معنى الحب والعطاء والتسامح.",
      author: "حكمة تربوية",
    },
    fr: {
      text: "La famille est la première école où l'être humain apprend le sens de l'amour, du don et du pardon.",
      author: "Sagesse éducative",
    },
    en: {
      text: "The family is the first school where a person learns the meaning of love, giving, and forgiveness.",
      author: "Educational wisdom",
    },
  },
  {
    id: 9,
    tag: "love",
    ar: {
      text: "شريك الحياة الحقيقي هو من تستطيع أن تصمت معه دون أن تشعر بالحرج.",
      author: "حكمة حديثة",
    },
    fr: {
      text: "Le vrai compagnon de vie est celui avec qui tu peux rester silencieux sans te sentir mal à l'aise.",
      author: "Sagesse moderne",
    },
    en: {
      text: "A true life partner is someone you can sit in silence with and feel completely at ease.",
      author: "Modern wisdom",
    },
  },
  {
    id: 10,
    tag: "marriage",
    ar: {
      text: "الزواج السعيد لا يعني غياب المشاكل، بل القدرة على حلها معاً بيد واحدة.",
      author: "حكمة حديثة",
    },
    fr: {
      text: "Un mariage heureux ne signifie pas l'absence de problèmes, mais la capacité de les résoudre ensemble, main dans la main.",
      author: "Sagesse moderne",
    },
    en: {
      text: "A happy marriage does not mean the absence of problems, but the ability to solve them together, hand in hand.",
      author: "Modern wisdom",
    },
  },
];

const ROTATION_MS = 30 * 60 * 1000;

export function getQuoteIndex(now = Date.now()) {
  return Math.floor(now / ROTATION_MS) % DAILY_QUOTES.length;
}

export function getQuoteForLang(lang, now = Date.now()) {
  const quote = DAILY_QUOTES[getQuoteIndex(now)];
  const localized = quote[lang] ?? quote.en;
  return {
    id: quote.id,
    tag: quote.tag,
    text: `"${localized.text}"`,
    author: `— ${localized.author}`,
  };
}

export function msUntilNextQuote(now = Date.now()) {
  return ROTATION_MS - (now % ROTATION_MS);
}
