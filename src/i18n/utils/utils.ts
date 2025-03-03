import type { Translations } from "./types";

type Language = string;

const translationsMap = import.meta.glob("../locales/*.json", {
  eager: true,
  import: "default",
});

export const availableLanguages = Object.keys(translationsMap)
  .map((path) => path.match(/\/([\w-]+)\.json$/)?.[1])
  .filter(Boolean) as string[];

export function getCurrentLang(locals?: { lang?: string }): Language {
  if (import.meta.env.SSR) {
    // En el servidor, se espera que se pase Astro.locals
    return locals?.lang || "en";
  } else {
    // En el cliente: leer de la cookie o de navigator
    const cookieLang = document.cookie.match(/lang=([^;]+)/)?.[1];
    return cookieLang || navigator.language.split("-")[0];
  }
}

export function getTranslations(lang: Language) {
  const validLang = availableLanguages.includes(lang) ? lang : "en";
  return translationsMap[`../locales/${validLang}.json`] as Translations;
}
