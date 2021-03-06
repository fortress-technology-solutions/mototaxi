import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import pascalCase from 'pascal-case';

const pkg = require('./package');

export default {
  moduleId: pkg.name,
  moduleName: pascalCase(pkg.name),
  entry: 'es/index.js',
  dest: 'dist/bundle.js',
  format: 'umd',
  exports: 'named',
  sourceMap: true,
  external: ['aws-sdk'],
  plugins: [
    sourcemaps(),
    nodeResolve(),
    nodeGlobals(),
    nodeBuiltins(),
    commonjs(),
    uglify()
  ]
};
