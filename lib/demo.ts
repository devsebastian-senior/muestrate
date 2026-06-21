/**
 * Flag de modo demo: true cuando NO hay DB conectada (Fase 0).
 * La capa de datos (lib/data) usa esto para devolver datos demo en vez de DB.
 */
export const isDemoMode = () => !process.env.DATABASE_URL;
