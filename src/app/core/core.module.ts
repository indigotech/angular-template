import { NgModule } from '@angular/core';

import { GuardModule } from './guard';
import { UtilsModule } from './utils';
import { BrowserModule } from './browser';
import { SeoModule } from './seo';

@NgModule({
  imports: [
    BrowserModule,
    SeoModule,
    GuardModule,
    UtilsModule,
  ],
  providers: [
  ],
})
export class CoreModule {}
