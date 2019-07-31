import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AutocompleteSimpleDirective,
  DatepickerDirective,
  InputErasableDirective,
  InputFocusDirective,
  InputMaskDirective,
  InputBaseDirective,
  InputFloatLabeledDirective,
  InputFileDirective,
  InputImageDirective,
} from './';

const directives = [
  AutocompleteSimpleDirective,
  DatepickerDirective,
  InputMaskDirective,
  InputErasableDirective,
  InputFocusDirective,
  InputBaseDirective,
  InputFloatLabeledDirective,
  InputFileDirective,
  InputImageDirective,
];

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...directives,
  ],
  exports:      [
    ...directives,
  ],
})
export class TqFormsModule { }
