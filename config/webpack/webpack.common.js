const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const metadata = require('./constants').METADATA;

/*
 * ===== RULES =====
 */

var rules = {};
var exec = require('child_process').execSync;
/*
 * Tslint loader support for *.ts files
 *
 * See: https://github.com/wbuchwalter/tslint-loader
 */
rules.tsLint = {
  test: /\.ts$/,
  loader: 'tslint-loader',
  exclude: [ helpers.root('node_modules')]
};

/*
 * Source map loader support for *.js files
 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
 *
 * See: https://github.com/webpack/source-map-loader
 */
rules.sourceMap = {
  test: /\.js$/,
  enforce: 'pre',
  loader: 'source-map-loader',
  exclude: [
    // these packages have problems with their sourcemaps
    helpers.root('node_modules/rxjs'),
    helpers.root('node_modules/@angular'),
    helpers.root('node_modules/ng2-redux'),
    helpers.root('node_modules/apollo-angular'),
    helpers.root('node_modules/apollo-client'),
    helpers.root('node_modules/apollo-link-core'),
    helpers.root('node_modules/zen-observable-ts')

  ]
};

/*
 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
 *
 * See: https://github.com/s-panferov/awesome-typescript-loader
 */
rules.ts = {
  test: /\.ts$/,
  use: [{
    loader: 'awesome-typescript-loader',
    options: {
      emitErrors: true,
      failOnHint: true,
      resourcePath: 'src'
    }
  },{
    loader: 'angular-router-loader'
  }],
  exclude: [/\.(spec|e2e)\.ts$/]
};

/*
 * Raw loader support for *.css files
 * Returns file content as string
 *
 * See: https://github.com/webpack/raw-loader
 */
rules.rawCss = {
  test: /\.css$/,
  loader: 'raw-loader'
};

/* Raw loader support for *.html
 * Returns file content as string
 *
 * See: https://github.com/webpack/raw-loader
 */
rules.rawHtml = {
  test: /\.html$/,
  loader: 'raw-loader',
  exclude: [helpers.root('src/index.html'), helpers.root('src/guide.html')]
};

rules.pug = {
  test: /\.pug$/,
  loaders: ['raw-loader', 'pug-html-loader']
};

rules.stylus = {
  test: /\.styl$/,
  use: ['raw-loader', 'stylus-loader']
};

// rules.graphql = {
//   test: /\.(graphql|gql)$/,
//   exclude: /node_modules/,
//   loader: 'graphql-tag/loader'
// }

rules.graphql = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'graphql-tag/loader'
    },
    {
      loader: 'skeleton-loader',
      options: {
        procedure: function(content) {
          exec('npm run graphql-generate-types');
          return content;
        }
      }
    }
  ]

}

/*
 * ===== END RULES =====
 */

/*
 * ===== PLUGINS =====
 */
var plugins = {};

/*
 * Plugin: CheckerPlugin
 * Description: Do type checking in a separate process, so webpack don't need to wait.
 *
 * See: https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader
 */
plugins.checking = new CheckerPlugin();

/*
 * Plugin: CommonsChunkPlugin
 * Description: Shares common code between the pages.
 * It identifies common modules and put them into a commons chunk.
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
 */
plugins.commonChunk = new webpack.optimize.CommonsChunkPlugin({
  name: ['polyfills', 'vendor'].reverse(),
  minChunks: Infinity
});

/**
 * Plugin: ContextReplacementPlugin
 * Description: Provides context to Angular's use of System.import
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
 * See: https://github.com/angular/angular/issues/14898
 */
plugins.contextReplacement = new ContextReplacementPlugin(
  /angular(\\|\/)core(\\|\/)@angular/,
  helpers.root('src'),
  {}
);

/*
 * Plugin: CopyWebpackPlugin
 * Description: Copy files and directories in webpack.
 *
 * Copies project static assets.
 *
 * See: https://www.npmjs.com/package/copy-webpack-plugin
 */
plugins.copyAssets = new CopyWebpackPlugin([{
  from: 'src/assets',
  to: './assets',
  ignore: '*.styl'
}]);

/*
 * Plugin: HtmlWebpackPlugin
 * Description: Simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename
 * which changes every compilation.
 *
 * See: https://github.com/ampedandwired/html-webpack-plugin
 */
plugins.htmlIndex = new HtmlWebpackPlugin({
  template:       'src/index.html',
  filename:       'index.html',
  excludeChunks:  ['guide'],
  chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'app']),
  'metadata': metadata
});
plugins.htmlGuide = new HtmlWebpackPlugin({
  template:       'src/guide.html',
  filename:       'guide.html',
  excludeChunks:  ['app'],
  chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'guide']),
  'metadata': metadata
});

plugins.debug = new LoaderOptionsPlugin({
  debug: true
});

plugins.watchIgnore = new webpack.WatchIgnorePlugin([
    // helpers.root('src/app/models/graphql.schema.ts')
])
/*
 * ===== END PLUGINS =====
 */


exports.RULES = [
  rules.sourceMap,
  rules.ts,
  rules.rawCss,
  rules.rawHtml,
  rules.pug,
  rules.stylus,
  rules.graphql
];

exports.PLUGINS = [
  plugins.checking,
  plugins.commonChunk,
  plugins.contextReplacement,
  plugins.copyAssets,
  plugins.htmlIndex,
  plugins.htmlGuide,
  plugins.watchIgnore
];
