import { getCurrentLang, getTranslations } from "../i18n/utils/utils.ts";
const lang = getCurrentLang(); // en SSR esto retornará "en" (por defecto) o el valor adecuado
const translationsModule = getTranslations(lang);
const { projects, basics } = translationsModule;

const project =
  projects && projects.list && projects.list.length ? projects.list[0] : {};

const creativeWork = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  inLanguage: { lang },
  ...(project.name && { name: project.name }),
  ...(project.url && { url: project.url }),
  ...(project.image && { thumbnailUrl: project.image }),
  ...(project.keywords && { keywords: project.keywords }),
  ...(project.description && { description: project.description }),
  creator: {
    "@type": "Person",
    ...(basics.name && { name: basics.name }),
  },
};

export default creativeWork;
