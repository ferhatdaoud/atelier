// Vercel serverless entry point. vercel.json rewrites every /api/* request here,
// and the Express app in backend/ handles it with its normal routes.
import { app } from '../backend/src/app.js';

export default app;
