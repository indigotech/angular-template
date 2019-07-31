import { NgModule } from '@angular/core';

import {
    TranscludeDirective,
} from './';

const directives = [
    TranscludeDirective,
];

@NgModule({
  declarations: [
    ...directives,
  ],
  exports:      [
    ...directives,
  ],
})
export class UtilsModule { }
