const webpack = require('webpack');
const helpers = require('./helpers');
const fs      = require('fs');

const common = require('./webpack.common');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

/*
 * Webpack Constants
 */
const METADATA = require('./constants').METADATA;

const NODE_MODULES = fs.readdirSync(helpers.root('') + '/node_modules').filter(function(name) {
  return name != '.bin';
});


module.exports = {

  target: 'node',

  /*
   * Cache generated modules and chunks to improve performance for multiple incremental builds.
   * This is enabled by default in watch mode.
   * You can pass false to disable it.
   *
   * See: http://webpack.github.io/docs/configuration.html#cache
   * cache: false,
   *
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'server': './src/server.ts'
  },

  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {

    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: helpers.root('dist/private'),
    // publicPath: 'assets/js/',


    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].bundle.js',

    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: '[name].map',

    /** The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: '[name].chunk.js',

    library: 'server',
    libraryTarget: 'commonjs2'
  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js'],

    modules: [
      helpers.root('src'),
      'node_modules'
    ],

    plugins: [ new TsConfigPathsPlugin() ]
  },

  module: {
    rules: common.RULES
  },
  node: {
    __dirname:  true,
    __filename: true
  },
  externals: [
    NODE_MODULES.map(function(name) { return new RegExp('^' + name) }),
  ]
};
