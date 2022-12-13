import { resolve } from 'path'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

function getOutputFileName(fileName, isProd = false) {
  return isProd ? fileName.replace(/\.js$/, '.min.js') : fileName
}

const env = process.env.NODE_ENV || 'development'
const ROOT = resolve(__dirname, '.')

const PLUGINS = [
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      allowJs: false,
      include: ['src'],
      exclude: ['tests', 'examples', '*.js', 'scripts'],
    },
  }),
]

module.exports = [
  // ES module (for bundlers) build.
  {
    input: 'src/index.ts',
    external: [],
    output: [
      {
        file: getOutputFileName(
          resolve(ROOT, pkg.module),
          env === 'production'
        ),
        exports: 'named',
        format: 'es',
        sourcemap: env === 'production', // create sourcemap for error reporting in production mode
      },
    ],
    plugins: [
      env === 'production' ? terser() : {}, // will minify the file in production mode
      ...PLUGINS,
    ],
  },
]
