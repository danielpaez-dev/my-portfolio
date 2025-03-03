import { defineMiddleware } from "astro:middleware";
import { availableLanguages } from "@/i18n/utils/utils.ts";

export const onRequest = defineMiddleware(async (context, next) => {
  const langCookie = context.cookies.get("lang")?.value;
  const acceptLanguage = context.request.headers.get("accept-language") || "en";
  const rawLang = langCookie || acceptLanguage.split(/[-_,;]/)[0].toLowerCase();
  const lang = availableLanguages.includes(rawLang) ? rawLang : "en";

  // Ahora TypeScript reconocerá "lang" en context.locals
  context.locals.lang = lang;

  const response = await next();

  if (!langCookie || langCookie !== lang) {
    response.headers.set(
      "Set-Cookie",
      `lang=${lang}; Path=/; SameSite=Lax; Max-Age=31536000`,
    );
  }

  return response;
});
