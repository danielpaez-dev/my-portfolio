import type { Translations } from "./types";

// Carga directa sin manipulación de rutas
const translationsMap = import.meta.glob(
  "@locales/*.json", // Usando alias configurado
  {
    eager: true,
    import: "default",
  },
) as Record<string, Translations>;
console.log(translationsMap);

// Validación optimizada
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

// Función a prueba de errores
export function getTranslations(lang: string): Translations {
  const safeLang = lang.toLowerCase().replace(/[^a-z]/g, "");
  return (
    translationsMap[`/src/i18n/locales/${safeLang}.json`] ||
    translationsMap["/src/i18n/locales/en.json"]
  );
}

// Implementación simplificada
export function getCurrentLang(): string {
  return navigator?.language?.split("-")[0] || "en";
}
