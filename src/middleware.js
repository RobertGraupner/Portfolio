import { defineMiddleware } from "astro:middleware";
import { ui, defaultLang } from "./i18n/translations";

// Lista dostępnych języków z pliku tłumaczeń
const languages = Object.keys(ui);

export const onRequest = defineMiddleware(({ request, locals }, next) => {
  // Ustalamy preferowany język użytkownika
  const acceptLanguage = request.headers.get("accept-language");
  let preferredLanguage = defaultLang;

  // Próbujemy ustalić preferowany język z nagłówków
  if (acceptLanguage) {
    const browserLangs = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim());
    // Szukamy pierwszego pasującego języka z naszej listy
    const matchedLang = browserLangs.find(
      (lang) =>
        languages.includes(lang) || languages.includes(lang.split("-")[0]),
    );

    if (matchedLang) {
      // Jeśli mamy np. pl-PL, bierzemy tylko pl
      preferredLanguage = matchedLang.includes("-")
        ? matchedLang.split("-")[0]
        : matchedLang;
      if (!languages.includes(preferredLanguage)) {
        preferredLanguage = defaultLang;
      }
    }
  }

  // Zapisujemy wykryty język do kontekstu lokalnego
  locals.lang = preferredLanguage;

  return next();
});
