import { onCall, onRequest, HttpsError } from 'firebase-functions/v2/https';
import { auth } from 'firebase-functions/v2';
import express from 'express';
import cors from 'cors';
import { logger } from 'firebase-functions';

export { onUserCreated } from './auth/onUserCreated';

// ---------------------------------------------------------------------------
// Callable function example
// ---------------------------------------------------------------------------
export const hello = onCall({ cors: true }, async (request) => {
  const name = (request.data as { name?: string }).name ?? 'world';
  return { message: `Hello, ${name}!` };
});

// ---------------------------------------------------------------------------
// Express HTTP API
// ---------------------------------------------------------------------------
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

export const api = onRequest({ cors: true }, app);
