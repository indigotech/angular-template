import { InjectionToken } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';

export const WINDOW_TOKEN = new InjectionToken<Window>('tqWindow');

export const WindowProvider = {
  provide: WINDOW_TOKEN,
  useFactory: windowFactory,
  deps: [ PlatformService ],
};

function windowFactory(platform: PlatformService) {
  if (platform.isBrowser()) {
    return window;
  } else {
    return { };
  }
}
