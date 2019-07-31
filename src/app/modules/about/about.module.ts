import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { About, aboutRouting } from './';


@NgModule({
  imports:      [
    CommonModule,
    aboutRouting,
  ],
  declarations: [ About ],
})
export class AboutModule { }
