const DefinePlugin = require('webpack/lib/DefinePlugin');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const helpers = require('./helpers');
const clientConfig = require('./webpack.client.common-config.js'); // the settings that are common to prod and dev
const serverConfig = require('./webpack.server.common-config.js'); // the settings that are common to prod and dev

const constants = require('./constants');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = [
  webpackMerge(clientConfig, {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',

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
      path: helpers.root('dist/public'),

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
      chunkFilename: '[name].chunk.js'
    },

    plugins: [ constants.CONSTS_PLUGIN ]
  }),

  webpackMerge(serverConfig, {
    plugins: [ constants.CONSTS_PLUGIN ]
  })
];
