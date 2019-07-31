import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { TransferHttpModule } from '@ng-universal/transfer-http';

import { PlatformModule } from '@tq-angular/platform';

import { SharedModule, NavigationControlService }   from 'app/modules/shared';
import { CoreModule, CORE_PROVIDERS } from 'app/core';
import { ResourceModule } from 'app/resources';

import { App, AppRoot, appRouting } from './';

import { NotificationService } from 'app/modules/shared/notification/notification.service';

@NgModule({
  imports:      [
    HttpModule,
    TransferHttpModule,
    PlatformModule,
    SharedModule,
    ResourceModule,
    CoreModule,
    appRouting,
  ],
  providers:    [
    ...CORE_PROVIDERS,
    NavigationControlService,
    NotificationService,
  ],
  declarations: [ App, AppRoot ],
  exports:      [ App, SharedModule ],
})
export class AppModule { }
