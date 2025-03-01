import { ui, defaultLang } from "./translations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

// Funkcja do uzyskania lokalnej ścieżki (bez języka)
export function getLocalizedPathname(pathname: string) {
  // Usuń pierwszy i ewentualnie drugi slash
  const segments = pathname.split("/").filter(Boolean);

  // Sprawdź, czy pierwszy segment to kod języka
  if (segments.length > 0 && segments[0] in ui) {
    // Usuń kod języka z ścieżki
    return "/" + segments.slice(1).join("/");
  }

  return pathname;
}
