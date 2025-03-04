import type { Translations } from "./types";

// Usa la ruta absoluta en el glob
const translationsMap = import.meta.glob("/src/i18n/locales/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Translations>;

console.log(translationsMap);

// Validación optimizada de idiomas disponibles
export const availableLanguages = Object.keys(translationsMap)
  .map((path) => {
    try {
      return new URL(path).searchParams.get("lang");
    } catch {
      const match = path.match(/([a-z]{2})\.json$/i);
      return match ? match[1].toLowerCase() : null;
    }
  })
  .filter(Boolean) as string[];

// Función a prueba de errores para obtener las traducciones
export function getTranslations(lang: string): Translations {
  const safeLang = lang.toLowerCase().replace(/[^a-z]/g, "");
  return (
    translationsMap[`/src/i18n/locales/${safeLang}.json`] ||
    translationsMap["/src/i18n/locales/en.json"]
  );
}

// Función para obtener el idioma en el cliente
export function getCurrentLang(): string {
  return navigator?.language?.split("-")[0] || "en";
}
