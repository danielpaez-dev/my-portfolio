import { lang } from "../i18n/utils/utils.ts";
import { translations } from "@/i18n/utils/utils";
const translationsModule = translations;
const { projects, basics } = translationsModule.default;

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
