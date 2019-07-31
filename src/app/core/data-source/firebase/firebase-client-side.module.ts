import { ModuleWithProviders, NgModule } from '@angular/core';
import { FirebaseAppProvider, FirebaseApp, FirebaseAppConfig, FirebaseAppName, FirebaseAppConfigToken} from 'angularfire2';
import { AUTH_PROVIDERS, AngularFireAuth} from 'angularfire2/auth';
import { DATABASE_PROVIDERS, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { FirebaseConfig, FirebaseService, FirebaseServiceToken, FirebaseClientSideService } from './';



@NgModule({})
export class FirebaseServiceServerSideModule {
  static forRoot(firebaseConfig: FirebaseConfig): ModuleWithProviders {

    return {
      ngModule: FirebaseServiceServerSideModule,
      providers: [
        { provide: FirebaseServiceToken,
          useClass: FirebaseClientSideService,
          deps: [AngularFireAuth, AngularFireDatabase, FirebaseApp] },
        FirebaseAppProvider,
        AUTH_PROVIDERS,
        DATABASE_PROVIDERS,
        { provide: FirebaseAppConfigToken, useValue: firebaseConfig },
        { provide: FirebaseAppName, useValue: undefined },
      ],
    };
  }
}
