import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseComponent } from 'app/core';

import { AnimatedComponent, AnimationScaleUp } from 'widgets';
import { ModalDirective } from 'widgets';
import { TqValidators, LENGTH_MAX_EMAIL, LENGTH_MAX_PASSWORD, LENGTH_MIN_PASSWORD } from 'widgets/forms';

import { NotificationService } from 'app/modules/shared/notification';

import { LoginUseCase } from 'app/domain';
import { LoginResponse } from 'app/models';

import { AccountForgotPassword } from './';

@AnimatedComponent('fadeIn')
@Component({
  selector: 'login',
  template: require('./account-login.pug'),
  animations: [ AnimationScaleUp ],
})

export class AccountLogin extends BaseComponent implements OnInit {

  @ViewChild ('modal') modal: ModalDirective;
  @ViewChild ('forgotPassword') forgotPassword: AccountForgotPassword;

  private readonly notificationName               : string = 'account-login';
  private readonly notificationForgotpasswordName : string = 'account-forgot-password';

  private form          : FormGroup;
  private submitted     : boolean = false;
  private isBtnLoading  : boolean = false;
  private emailField    : FormControl;
  private passwordField : FormControl;

  private readonly lengthMaxPassword : number = LENGTH_MAX_PASSWORD;
  private readonly lengthMinPassword : number = LENGTH_MIN_PASSWORD;
  private readonly lengthMaxEmail    : number = LENGTH_MAX_EMAIL;

  constructor(
    notification         : NotificationService,
    private loginUseCase : LoginUseCase,
    private router       : Router,
    private fb           : FormBuilder,
  ) { super(notification); }

  ngOnInit() {
    this.initForms();
  }

  // Form

  onLoginSubmit(form: FormGroup): void {
    this.submitted = true;

    if (form.valid) {
      // TODO
      this.showBtnLoading();

      this.subscriptions.push(
        this.loginUseCase
            .execute(form.value.emailField, form.value.passwordField)
            .finally(() => this.hideBtnLoading())
            .subscribe(
              response => { /* TODO */ },
              error => this.showErrorMsg(this.notificationName, error),
            ),
      );
    }
  }

  // Forgot password

  onForgotPasswordSubmit(form: FormGroup): void {
    if (form.valid) {
      // TODO

      setTimeout(() => {
        this.forgotPassword.hideBtnLoading();
        this.showErrorMsg(this.notificationForgotpasswordName, '<Notification Forgot Password Mock> Ocorreu um erro no servidor.');
        this.forgotPassword.clearForm();
      }, 1000);
    }
  }

  private initForms() {
    this.emailField = new FormControl('', [
      Validators.required,
      TqValidators.emailPattern(),
      Validators.maxLength(this.lengthMaxEmail),
    ]);
    this.passwordField = new FormControl('', [
      Validators.required,
      Validators.minLength(this.lengthMinPassword),
      Validators.maxLength(this.lengthMaxPassword),
    ]);

    this.form = this.fb.group({
      emailField: this.emailField,
      passwordField: this.passwordField,
      rememberPasswordField: false,
    });
  }

  // Button - Loading

  private showBtnLoading() {
    this.isBtnLoading = true;
  }

  private hideBtnLoading() {
    this.isBtnLoading = false;
  }
}
