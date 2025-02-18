type Language = string;

const locales = import.meta.glob("../locales/*.json", { eager: true });

const availableLanguages: Language[] = Object.keys(locales)
  .map((path) => {
    const match = path.match(/([\w-]+)\.json$/);
    return match ? match[1] : "";
  })
  .filter(Boolean);

export function getInitialLang(): Language {
  const detectedLang = navigator.language.split("-")[0];
  return availableLanguages.includes(detectedLang)
    ? detectedLang
    : availableLanguages[0];
}

export let lang: Language = getInitialLang();
export let translations;
translations = locales[`../locales/${lang}.json`];
