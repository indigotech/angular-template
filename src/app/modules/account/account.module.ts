import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/modules/shared/shared.module';

import { AccountLogin, AccountForgotPassword, AccountEditPassword, accountRouting } from './';


@NgModule({
  imports:      [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    accountRouting,
  ],
  providers:    [
  ],
  declarations: [
    AccountLogin,
    AccountEditPassword,
    AccountForgotPassword,
  ],
})
export class AccountModule { }
