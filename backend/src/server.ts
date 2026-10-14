import { app } from './app.js';
import { config } from './config.js';
import { pool } from './db/pool.js';
import { verifyMailer } from './lib/mailer.js';

const server = app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT} (${config.NODE_ENV})`);
});

pool
  .query('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL.'))
  .catch((err: Error) => console.error(`Cannot connect to PostgreSQL: ${err.message}. Check DATABASE_URL in backend/.env.`));

void verifyMailer();

function shutdown() {
  server.close(() => {
    void pool.end().then(() => process.exit(0));
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
