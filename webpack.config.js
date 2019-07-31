require('dotenv').config()

switch (process.env.ENV) {
  case 'prod':
  case 'production':
    console.info('PRODUCTION BUILD CONFIGURATION');
    module.exports = require('./config/webpack/webpack.prod');
    break;
  case 'dev':
  case 'development':
  default:
    console.info('DEVELOPMENT BUILD CONFIGURATION');
    module.exports = require('./config/webpack/webpack.dev');
}
