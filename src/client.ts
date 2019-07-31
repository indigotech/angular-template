// Angular 2
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// enable prod for faster renders
enableProdMode();

import { ClientAppModule } from 'app/client-app.module';

const platformRef = platformBrowserDynamic();

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => {
  platformRef.bootstrapModule(ClientAppModule)
             .then(() => console.warn('bootstrapped'))
             .catch(err => console.error(err));
});
