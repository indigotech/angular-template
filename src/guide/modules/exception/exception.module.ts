import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import {
  Four04,
  exceptionRouting,
} from './';


@NgModule({
  imports:      [
    CommonModule,
    exceptionRouting,
  ],
  providers:    [  ],
  declarations: [
    Four04,
  ],
})
export class ExceptionModule { }
