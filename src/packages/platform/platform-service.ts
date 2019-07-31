import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi } from '@angular/common';

@Injectable()
export class PlatformService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  isWorkerApp(): boolean {
    return isPlatformWorkerApp(this.platformId);
  }

  isPlatformWorkerUi(): boolean {
    return isPlatformWorkerUi(this.platformId);
  }
}
