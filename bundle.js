import esbuild from "esbuild"
import path from "path"

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    platform: 'node',
    target: 'node14',
    external: ['./node_modules/*'],
  })
  .catch(() => process.exit(1));