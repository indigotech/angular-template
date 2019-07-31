import { ModuleWithProviders, NgModule, Provider, Type, InjectionToken } from '@angular/core';
import { FirebaseAppConfigToken } from 'angularfire2';

import { HttpClient } from 'app/core';
import { FirebaseConfig, FirebaseService, FirebaseServiceToken, FirebaseServerSideService } from './';

@NgModule({
})
export class FirebaseServerSideModule {
  static forRoot(firebaseConfig: FirebaseConfig): ModuleWithProviders {

    return {
      ngModule: FirebaseServerSideModule,
      providers: [
        { provide: FirebaseServiceToken, useClass: FirebaseServerSideService, deps: [HttpClient, FirebaseAppConfigToken] },
        { provide: FirebaseAppConfigToken, useValue: firebaseConfig },
      ],
    };
  }
}
