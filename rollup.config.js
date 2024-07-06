import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import wasm from '@rollup/plugin-wasm';
// import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
// import serve from 'rollup-plugin-serve';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(), // Needed to bundle the assets from node_modules
    // importMetaAssets(), // Needed to resolve Wasm imports
    typescript(),
    wasm({
      targetEnv: 'auto-inline',
      maxFileSize: 0,
    }),
    // serve({
    //   open: true
    // }) // Optional, for convenience when testing example
  ]
};
