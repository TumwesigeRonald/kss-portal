/**
 * api/index.js — Vercel serverless function entry point (project root).
 * The portal frontend is served statically from /public, and every
 * /api/* request is rewritten here (see vercel.json) into the Express app
 * that lives in kss-backend/app.js.
 */
module.exports = require('../kss-backend/app');
