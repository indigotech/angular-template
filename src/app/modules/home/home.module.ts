import { NgModule } from '@angular/core';

import { SharedModule } from 'app/modules/shared/shared.module';

import { Home, homeRouting } from './';

@NgModule({
  imports:      [
    SharedModule,
    homeRouting,
  ],
  declarations: [ Home ],
})
export class HomeModule { }
