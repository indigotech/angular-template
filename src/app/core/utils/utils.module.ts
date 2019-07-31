import { NgModule } from '@angular/core';

import {
  ClipboardService,
  QueryParamsService,
} from './';

@NgModule({
  providers: [
    ClipboardService,
    QueryParamsService,
  ],
})
export class UtilsModule {}
