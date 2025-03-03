declare module "astro:middleware" {
  /**
   * Define middleware para Astro.
   * Esta es una definición mínima para evitar el error de módulo no encontrado.
   */
  export function defineMiddleware<T = any>(
    fn: (
      context: T,
      next: () => Promise<Response>,
    ) => Promise<Response> | Response,
  ): (context: T, next: () => Promise<Response>) => Promise<Response>;
}
