import * as fs from 'fs';

import { ApplicationRef, NgModuleFactory, NgModuleRef, PlatformRef, Type, StaticProvider, ValueProvider } from '@angular/core';
import { INITIAL_CONFIG, PlatformState, platformDynamicServer, platformServer } from '@angular/platform-server';
import { Request, Response, Send } from 'express';

/**
 * This is the render callback that may be passed to the handleModuleRef.
 * In the past we were using Send, which is erroneous and makes we call
 * the html string as error.
 * For more info take a look at the method render in @types/express-serve-static-core/index.d.ts
 */
export type RenderCallback = (err: Error, html: string) => void;

/**
 * These are the allowed options for the engine
 */
export interface NgSetupOptions {
  aot?: boolean;
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  providers?: StaticProvider[];
}

/**
 * This holds a cached version of each index used.
 */
const templateCache: { [key: string]: string } = {};

/**
 * This is an express engine for handling Angular Applications
 */
export function ngExpressEngine(setupOptions: NgSetupOptions) {

  setupOptions.providers = setupOptions.providers || [];

  return function (filePath, options: { req: Request, res?: Response }, callback: RenderCallback) {
    try {
      const moduleFactory = setupOptions.bootstrap;

      if (!moduleFactory) {
        throw new Error('You must pass in a NgModule or NgModuleFactory to be bootstrapped');
      }

      const extraProviders = setupOptions.providers.concat(
        getReqResProviders(options.req, options.res),
        [
          {
            provide: INITIAL_CONFIG,
            useValue: {
              document: getDocument(filePath),
              url: options.req.originalUrl,
            },
          },
        ]);

      const moduleRefPromise = setupOptions.aot ?
        platformServer(extraProviders).bootstrapModuleFactory(<NgModuleFactory<{}>>moduleFactory) :
        platformDynamicServer(extraProviders).bootstrapModule(<Type<{}>>moduleFactory);

      moduleRefPromise.then((moduleRef: NgModuleRef<{}>) => {
          handleModuleRef(moduleRef, callback);
        });

    } catch (e) {
      callback(e, null);
    }
  };
}

function getReqResProviders(req: Request, res: Response): ValueProvider[] {
  const providers: ValueProvider[] = [
    {
      provide: 'REQUEST',
      useValue: req,
    },
  ];
  if (res) {
    providers.push({
      provide: 'RESPONSE',
      useValue: res,
    });
  }
  return providers;
}

/**
 * Get the document at the file path
 */
function getDocument(filePath: string): string {
  return templateCache[filePath] = templateCache[filePath] || fs.readFileSync(filePath).toString();
}

/**
 * Handle the request with a given NgModuleRef
 */
function handleModuleRef(moduleRef: NgModuleRef<{}>, callback: RenderCallback) {
  const state = moduleRef.injector.get(PlatformState);
  const appRef = moduleRef.injector.get(ApplicationRef);

  appRef.isStable
    .filter((isStable: boolean) => isStable)
    .first()
    .subscribe((stable) => {
      const bootstrap = moduleRef.instance['ngOnBootstrap'];
      if (bootstrap) {
        bootstrap();
      }

      callback(null, state.renderToString());
      moduleRef.destroy();
    });
}
