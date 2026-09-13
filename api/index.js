// Vercel serverless entry.
//
// Imports the bundled build rather than src/ on purpose: package.json is
// "type": "module", and Node's ESM resolver needs file extensions on relative
// imports. Neither our src/ nor Prisma's generated client writes them, so
// Vercel's per-file transpile produces ERR_MODULE_NOT_FOUND. The tsup bundle
// inlines everything into one file with no relative imports, so it loads.
//
// dist/app.js is produced by `npm run build`, which Vercel runs before
// building functions.
export { default } from "../dist/app.js";
