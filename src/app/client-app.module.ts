import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserTransferStateModule } from '@ng-universal/transfer-state-browser';

import { FirebaseServiceServerSideModule } from 'app/core/data-source/firebase';
import { AppModule, App } from 'app/modules/app';
import { FIREBASE_CONFIG } from './constants';

@NgModule({
  bootstrap: [ App ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: build.env.APP_ID,
    }),
    BrowserTransferStateModule,
    AppModule,
    FirebaseServiceServerSideModule.forRoot(FIREBASE_CONFIG),
  ],
})
export class ClientAppModule {}
