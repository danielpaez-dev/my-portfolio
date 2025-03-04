import { availableLanguages } from "src/i18n/utils/utils.ts";

export async function onRequest({ request, url }) {
  const headerLang = request.headers.get("x.lang");

  const lang =
    headerLang && availableLanguages.includes(headerLang)
      ? headerLang
      : availableLanguages[0];

  if (!url.pathname.startsWith(`/${lang}`)) {
    return Response.redirect(
      new URL(`/${lang}${url.pathname}`, url).toString(),
      302,
    );
  }

  return new Response(null, { status: 200 });
}
