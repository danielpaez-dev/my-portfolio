type Language = "en" | "es";

export const getInitialLang = (): Language => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("lang")) {
    return localStorage.getItem("lang") as Language;
  }
  return navigator.language.split("-")[0] === "es" ? "es" : "en";
};
export const lang = getInitialLang();
