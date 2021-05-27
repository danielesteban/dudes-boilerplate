import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

const outputPath = path.resolve(__dirname, 'dist');

export default {
  input: path.join(__dirname, 'main.js'),
  output: {
    file: path.join(outputPath, 'main.js'),
    format: 'module',
  },
  onwarn: (warning, next) => {
    if (!(warning.importer || warning.id).includes('protobufjs')) {
      next(warning);
    }
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    copy({
      targets: [
        { src: 'node_modules/dudes/core/voxels.wasm', dest: 'dist' },
        { src: 'node_modules/dudes/vendor/fflate.worker.js', dest: 'dist' },
        { src: 'node_modules/fflate/umd/index.js', dest: 'dist', rename: 'fflate.js' },
        { src: 'node_modules/three/examples/js/libs/ammo.wasm.*', dest: 'dist' },
        { src: 'sounds/*.ogg', dest: 'dist/sounds' },
        { src: 'index.*', dest: 'dist' },
      ],
      copyOnce: true,
    }),
    ...(process.env.ROLLUP_WATCH ? [
      serve({
        contentBase: outputPath,
        historyApiFallback: true,
        port: 8080,
      }),
      livereload(outputPath),
    ] : [
      terser(),
    ]),
  ],
  watch: { clearScreen: false },
};
