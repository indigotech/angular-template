import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/modules/shared/shared.module';

import {
  userRouting,
  UserFormDirective,
  UserNew, UserEdit, UserList } from './';

@NgModule({
  imports:      [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    userRouting,
  ],
  providers:    [
  ],
  declarations: [
    UserFormDirective,
    UserNew,
    UserEdit,
    UserList,
  ],
})
export class UserModule { }
