/**
 * Cliente Drizzle sobre postgres.js, apuntando al pooler de Supabase.
 *
 * Inicialización LAZY: no se construye hasta el primer uso real. Así el build
 * (sin DATABASE_URL) y los imports no crashean. En código siempre comprobamos
 * process.env.DATABASE_URL antes de tocar `db` (ver entitlements / checkout).
 */
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DB = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
  db: DB | undefined;
};

function getDb(): DB {
  if (globalForDb.db) return globalForDb.db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL no configurada. Conecta Supabase en .env.local antes de usar la base de datos.",
    );
  }

  const client = globalForDb.client ?? postgres(connectionString, { prepare: false, max: 1 });
  const instance = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.client = client;
    globalForDb.db = instance;
  }
  return instance;
}

// Proxy: difiere la construcción hasta el primer acceso a una propiedad.
export const db = new Proxy({} as DB, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real as object, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export { schema };
