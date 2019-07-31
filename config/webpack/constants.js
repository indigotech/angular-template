require('dotenv').config();

const helpers = require('./helpers');
const fs      = require('fs');
const package = JSON.parse(fs.readFileSync(helpers.root('') + '/package.json', 'utf8'));

exports.METADATA = {
  title: 'Taqtile\'s Angular Web Template',
  baseUrl: '/',
  version: package.version
};

const DefinePlugin = require('webpack/lib/DefinePlugin');
/**
 * Plugin: DefinePlugin
 * Description: Define free variables.
 * Useful for having development builds with debug logging or adding global constants.
 *
 * Environment helpers
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
 */
// NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
exports.CONSTS_PLUGIN = new DefinePlugin({
  'ENV': JSON.stringify(process.env.ENV),
  'build.env': {
    'ENV': JSON.stringify(process.env.ENV),
    'APP_ID': JSON.stringify(process.env.APP_ID),
    'API_URL': JSON.stringify(process.env.API_URL),
    'FIREBASE': {
      'API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'DATABSE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    }
  },
  /**
   * Fix to use Apollo-Client
   * https://github.com/gaearon/redux-devtools/issues/162
   * According to this issue, Redux suppose that the
   * app should `envify` their code.
   */
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
});
