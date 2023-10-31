import pgp from 'pg-promise';

let connectionUrl: string | undefined = process.env.VERCEL_POSTGRESQL_URL;

if (!connectionUrl) {
  throw new Error('VERCEL_POSTGRESQL_URL environment variable is not defined.');
}

const db = pgp()(connectionUrl);

export async function query(q: string, values?: any[]) {
  return await db.any(q, values);
}

export default db;
