import { useEffect, useState } from "react";
import { getQuoteForLang, msUntilNextQuote } from "../constants/dailyQuotes";

export default function useRotatingQuote(lang) {
  const [quote, setQuote] = useState(() => getQuoteForLang(lang));

  useEffect(() => {
    setQuote(getQuoteForLang(lang));

    let timerId;
    function scheduleNext() {
      timerId = setTimeout(() => {
        setQuote(getQuoteForLang(lang));
        scheduleNext();
      }, msUntilNextQuote());
    }
    scheduleNext();

    return () => clearTimeout(timerId);
  }, [lang]);

  return quote;
}
