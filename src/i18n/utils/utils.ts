type Language = string;

const locales = import.meta.glob("../locales/*.json", { eager: true });

const availableLanguages = Object.keys(locales).map(
  (path) => path.match(/([\w-]+)\.json$/)![1],
);

export const getInitialLang = (): Language => {
  let detectedLang: Language | null = null;
  if (typeof localStorage !== "undefined" && localStorage.getItem("lang")) {
    detectedLang = localStorage.getItem("lang")!;
  } else {
    detectedLang = navigator.language.split("-")[0];
  }
  return availableLanguages.includes(detectedLang) ? detectedLang : "";
};

export const lang = getInitialLang();
export const translations = locales[`../locales/${lang}.json`];
