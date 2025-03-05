import { defineMiddleware } from "astro:middleware";
import { availableLanguages, getCurrentLang } from "@/i18n/utils/utils";

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Obtener idioma de cookie, header o detección automática
  const langCookie = context.cookies.get("lang")?.value;
  const detectedLang = getCurrentLang(context.request); // Usamos la función actualizada

  // 2. Validar contra los idiomas disponibles
  const lang = availableLanguages.includes(detectedLang) ? detectedLang : "en";

  // 3. Guardar en locals para usar en componentes
  context.locals.lang = lang;

  // 4. Actualizar cookie si es necesario (válida por 1 año)
  const response = await next();
  if (!langCookie || langCookie !== lang) {
    response.headers.set(
      "Set-Cookie",
      `lang=${lang}; Path=/; SameSite=Lax; Max-Age=31536000; Secure${import.meta.env.PROD ? "; HttpOnly" : ""}`,
    );
  }

  return response;
});
