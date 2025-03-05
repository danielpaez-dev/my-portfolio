import type { Translations } from "./types";

// Usa la ruta absoluta en el glob para cargar todos los archivos de traducción de forma "eager"
const translationsMap = import.meta.glob("/src/i18n/locales/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Translations>;

// Validación optimizada de idiomas disponibles: se extrae el código de idioma del nombre del archivo
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

// Función a prueba de errores para obtener las traducciones según el idioma solicitado
export function getTranslations(lang: string): Translations {
  const safeLang = lang.toLowerCase().replace(/[^a-z]/g, "");
  return (
    translationsMap[`/src/i18n/locales/${safeLang}.json`] ||
    translationsMap["/src/i18n/locales/en.json"]
  );
}

// Función para obtener el idioma en el cliente (útil en el navegador)
export function getCurrentLang(): string {
  return navigator?.language?.split("-")[0] || "en";
}
