import { useMemo, useState } from "react";
import styles from "./Booking.module.css";
import { useLocale } from "../../i18n/LocaleContext";
import { DOCTOR_MAP } from "../../constants/doctors";

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getBookedSlotIndex(doctorId, dateKey, slotCount) {
  const seed = [...dateKey, doctorId].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return seed % slotCount;
}

function buildCalendarDays(year, month) {
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startPad = first.getDay();
  const days = [];

  for (let i = 0; i < startPad; i++) days.push(null);
  for (let d = 1; d <= lastDay; d++) days.push(new Date(year, month, d));
  return days;
}

export default function Booking({ doctorId, onBack }) {
  const { t, lang } = useLocale();
  const doctor = DOCTOR_MAP[doctorId];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [complaint, setComplaint] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const doctorName = doctor.name[lang] ?? doctor.name.en;
  const days = useMemo(
    () => buildCalendarDays(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const dateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const bookedIndex = dateKey
    ? getBookedSlotIndex(doctorId, dateKey, doctor.slots.length)
    : -1;

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function selectDay(day) {
    if (!day || day < today) return;
    setSelectedDate(day);
    setSelectedTime(null);
  }

  function handleConfirm() {
    if (selectedDate && selectedTime && complaint.trim()) {
      setConfirmed(true);
    }
  }

  const canConfirm = selectedDate && selectedTime && complaint.trim().length > 0;

  if (confirmed) {
    const formattedDate = selectedDate.toLocaleDateString(
      lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-FR" : "en-GB",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    return (
      <div className={styles.screen} dir={t.dir} lang={lang}>
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={onBack} aria-label={t.ui.back}>
            {t.dir === "rtl" ? "→" : "←"}
          </button>
          <h1 className={styles.title}>{t.booking.summaryTitle}</h1>
        </header>

        <div className={styles.summary}>
          <div className={styles.summaryIcon}>✓</div>
          <p className={styles.summaryDone}>{t.booking.done}</p>

          <dl className={styles.summaryList}>
            <div className={styles.summaryRow}>
              <dt>{t.booking.doctor}</dt>
              <dd>{doctorName}</dd>
            </div>
            <div className={styles.summaryRow}>
              <dt>{t.booking.date}</dt>
              <dd>{formattedDate}</dd>
            </div>
            <div className={styles.summaryRow}>
              <dt>{t.booking.time}</dt>
              <dd>{selectedTime}</dd>
            </div>
            <div className={styles.summaryRow}>
              <dt>{t.booking.concern}</dt>
              <dd>{complaint}</dd>
            </div>
          </dl>

          <button className={styles.confirmBtn} onClick={onBack}>
            {t.booking.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen} dir={t.dir} lang={lang}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label={t.ui.back}>
          {t.dir === "rtl" ? "→" : "←"}
        </button>
        <div>
          <h1 className={styles.title}>{t.booking.title}</h1>
          <p className={styles.doctorName}>{doctorName}</p>
        </div>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.booking.selectDate}</h2>

          <div className={styles.calNav}>
            <button className={styles.calNavBtn} onClick={prevMonth} aria-label="prev">
              {t.dir === "rtl" ? "›" : "‹"}
            </button>
            <span className={styles.calMonth}>
              {t.booking.months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button className={styles.calNavBtn} onClick={nextMonth} aria-label="next">
              {t.dir === "rtl" ? "‹" : "›"}
            </button>
          </div>

          <div className={styles.weekdays}>
            {t.booking.weekdays.map((d) => (
              <span key={d} className={styles.weekday}>{d}</span>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {days.map((day, i) => {
              if (!day) return <span key={`e-${i}`} className={styles.dayEmpty} />;
              const isPast = day < today;
              const isSelected = selectedDate && formatDateKey(day) === formatDateKey(selectedDate);
              return (
                <button
                  key={formatDateKey(day)}
                  className={`${styles.day} ${isPast ? styles.dayPast : ""} ${isSelected ? styles.daySelected : ""}`}
                  onClick={() => selectDay(day)}
                  disabled={isPast}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </section>

        {selectedDate && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.booking.selectTime}</h2>
            <div className={styles.legend}>
              <span><i className={styles.dotAvailable} /> {t.booking.available}</span>
              <span><i className={styles.dotBooked} /> {t.booking.booked}</span>
            </div>
            <div className={styles.slots}>
              {doctor.slots.map((slot, i) => {
                const isBooked = i === bookedIndex;
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    className={`${styles.slot} ${isBooked ? styles.slotBooked : styles.slotAvailable} ${isSelected ? styles.slotSelected : ""}`}
                    onClick={() => !isBooked && setSelectedTime(slot)}
                    disabled={isBooked}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <label className={styles.sectionTitle} htmlFor="complaint">
            {t.booking.complaint}
          </label>
          <textarea
            id="complaint"
            className={styles.textarea}
            placeholder={t.booking.complaintPlaceholder}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            rows={4}
          />
        </section>

        <button
          className={`${styles.confirmBtn} ${canConfirm ? styles.confirmActive : ""}`}
          onClick={handleConfirm}
          disabled={!canConfirm}
        >
          {t.booking.confirm}
        </button>
      </div>
    </div>
  );
}
