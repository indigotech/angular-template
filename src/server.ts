// the polyfills must be the first thing imported in node.js
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import * as path from 'path';
import * as express from 'express';

// Angular 2
import { enableProdMode } from '@angular/core';
import { platformServer, renderModuleFactory } from '@angular/platform-server';

import { ngExpressEngine } from '@ng-universal/ng-express-engine';

// Server app module
import { ServerAppModule } from 'app/server-app.module';
import { ROUTES } from './server-routes';

import * as compression from 'compression';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

app.use(compression());

// Express View
app.engine('.html', ngExpressEngine({ bootstrap: ServerAppModule }));
app.set('views', __dirname);
app.set('view engine', 'html');

// Serve static files
app.use(express.static(path.join(ROOT, 'dist/public'), {index: false}));

function ngApp(req, res) {
  console.time(`GET: ${req.originalUrl}`);

  res.render(
    path.join(ROOT, 'dist/public/index'),
    { req, res },
  );

  console.timeEnd(`GET: ${req.originalUrl}`);
}

// Routes with html5pushstate
// ensure routes match client-side-app
ROUTES.forEach(route => app.get(route, ngApp));

app.get('*', function(req, res) { ngApp(req, res.status(404)); });

export { app };
