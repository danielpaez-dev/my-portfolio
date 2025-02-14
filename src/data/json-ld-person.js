import { lang } from "../i18n/utils/utils.ts";
import { translations } from "@/i18n/utils/utils";
const translationsModule = translations;
const { basics, education, certificates, skills, languages, awards } =
  translationsModule.default;

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  ...(basics.name && { name: basics.name }),
  ...(basics.role && {
    jobTitle: [
      {
        "@value": basics.role,
        ...(lang && { "@language": lang }),
      },
    ],
  }),
  ...(basics.image && { image: basics.image }),
  ...(basics.url && { url: basics.url }),
  ...(basics.summary && { description: basics.summary }),
  sameAs: basics.profiles ? basics.profiles.map((profile) => profile.url) : [],
  address: {
    "@type": "PostalAddress",
    ...(basics.location.city && { addressLocality: basics.location.city }),
    ...(basics.location.countryCode && {
      addressCountry: basics.location.countryCode,
    }),
  },
  knowsAbout:
    skills && skills.list ? skills.list.map((skill) => skill.name) : [],
  knowsLanguage: languages
    ? languages.map((langItem) => langItem.language)
    : [],
  contactPoint: {
    "@type": "ContactPoint",
    ...(basics.contact.email.data && { email: basics.contact.email.data }),
    contactType: "personal",
  },
  alumniOf:
    education && education.length
      ? education
          .filter((edu) => edu.institution || edu.url)
          .map((edu) => ({
            "@type": "EducationalOrganization",
            ...(edu.institution && { name: edu.institution }),
            ...(edu.url && { url: edu.url }),
          }))
      : undefined,
  hasCredential:
    certificates && certificates.length
      ? certificates.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: [
            {
              "@value": cert.name,
              "@language": lang,
            },
          ],
          ...(cert.credential_url && { url: cert.credential_url }),
        }))
      : [],
  award:
    awards && awards.length
      ? awards.filter((award) => award.title).map((award) => award.title)
      : undefined,
};

export default jsonLdPerson;
