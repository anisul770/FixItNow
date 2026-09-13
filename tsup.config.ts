import { defineConfig } from "tsup";


export default defineConfig({
    // server.ts boots an HTTP listener for local dev / `npm start`.
    // app.ts is the same Express app without listen(), bundled for the
    // Vercel serverless handler in api/index.js
    entry: ["src/server.ts", "src/app.ts"],
    format: ["esm"], // Prisma's generated client requires import.meta.url, so CJS output is not viable
    target: "esnext",
    outDir: "dist",
    clean: true,
    bundle: true,
    splitting: false,

    sourcemap: true,

    // Shim require() for bundled CJS dependencies (Node has no global require in ESM)
    banner: {
        js: `import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);`,
    },

});
