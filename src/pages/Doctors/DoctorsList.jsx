import styles from "./DoctorsList.module.css";
import { useLocale } from "../../i18n/LocaleContext";
import { rankDoctors, getInitials } from "../../utils/doctorMatching";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className={styles.stars} aria-label={`${rating}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < full ? styles.starFull : i === full && half ? styles.starHalf : styles.starEmpty
          }
        >
          ★
        </span>
      ))}
      <span className={styles.ratingNum}>{rating.toFixed(1)}</span>
    </div>
  );
}

function DoctorAvatar({ name, photo }) {
  if (photo) {
    return <img src={photo} alt="" className={styles.avatar} draggable={false} />;
  }
  return <div className={styles.avatarFallback}>{getInitials(name)}</div>;
}

export default function DoctorsList({ surveyAnswers, onBook }) {
  const { t, lang } = useLocale();
  const doctors = rankDoctors(surveyAnswers);
  const topMatchId = doctors[0]?.id;

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t.doctors.title}</h1>
        <p className={styles.subtitle}>{t.doctors.subtitle}</p>
      </header>

      <div className={styles.list}>
        {doctors.map((doctor) => {
          const name = doctor.name[lang] ?? doctor.name.en;
          const specialty = doctor.specialty[lang] ?? doctor.specialty.en;
          const isRecommended = doctor.id === topMatchId && doctors.length > 1;

          return (
            <article key={doctor.id} className={styles.card}>
              {isRecommended && (
                <span className={styles.badge}>{t.doctors.recommended}</span>
              )}
              <div className={styles.cardBody}>
                <DoctorAvatar name={name} photo={doctor.photo} />
                <div className={styles.info}>
                  <h2 className={styles.name}>{name}</h2>
                  <p className={styles.specialty}>{specialty}</p>
                  <StarRating rating={doctor.rating} />
                </div>
              </div>
              <button
                className={styles.bookBtn}
                onClick={() => onBook(doctor.id)}
              >
                {t.doctors.book}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
