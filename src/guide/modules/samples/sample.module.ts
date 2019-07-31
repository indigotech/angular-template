import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WidgetsModule } from 'widgets/widgets.module';

import {
  FilterSample,
  FormSample,
  AddressFormDirective,
  CardFormDirective,
  UserFormDirective,
  Sample,
  SearchSample,
  sampleRouting,
} from './';


@NgModule ({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    WidgetsModule,
    sampleRouting,
  ],
  declarations: [
    FilterSample,
    FormSample,
    AddressFormDirective,
    CardFormDirective,
    UserFormDirective,
    Sample,
    SearchSample,
  ],
  exports:      [
  ],
})
export class SampleModule {}
