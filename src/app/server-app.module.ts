import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';

// currently comes from modules folder outside src folder - it should be published as npm package soon
import { ServerTransferStateModule } from '@ng-universal/transfer-state-server';
import { TransferState } from '@ng-universal/transfer-state';

import { FirebaseServiceServerSideModule, FirebaseServerSideModule } from 'app/core/data-source/firebase';
import { AppModule, App } from 'app/modules/app';
import { FIREBASE_CONFIG } from './constants';



@NgModule({
  bootstrap: [ App ],
  imports: [
    BrowserModule.withServerTransition({
      appId: build.env.APP_ID,
    }),
    ServerModule,
    ServerTransferStateModule,
    AppModule,
    FirebaseServerSideModule.forRoot(FIREBASE_CONFIG),
  ],
})
export class ServerAppModule {

  constructor(private transferState: TransferState) { }

  // Gotcha - needs to be arrrow function
  ngOnBootstrap = () => {
    // TODO Receive transfer state in client module and be compatible with dev-server at the same time
    this.transferState.initialize({
      API_URL: process.env.API_URL,
    });
    this.transferState.inject();
  }
}
