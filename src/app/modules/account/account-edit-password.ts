import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseComponent } from 'app/core';

import { AnimatedComponent, AnimationScaleUp } from 'widgets';
import { ModalDirective } from 'widgets';
import { LENGTH_MAX_PASSWORD, LENGTH_MIN_PASSWORD, TqValidators } from 'widgets/forms';

import { NotificationService } from 'app/modules/shared/notification';

@AnimatedComponent('fadeIn')
@Component({
  selector: 'account-edit-password',
  template: require('./account-edit-password.pug'),
  animations: [ AnimationScaleUp ],
})

export class AccountEditPassword extends BaseComponent implements OnInit {

  @ViewChild ('modal') modal: ModalDirective;

  private readonly notificationName : string = 'account-edit-password';

  private form                : FormGroup;
  private submitted           : boolean = false;
  private isBtnLoading        : boolean = false;
  private passwordField       : FormControl;
  private newPasswordField    : FormControl;
  private confirmPasswordField: FormControl;

  private readonly lengthMaxPassword : number = LENGTH_MAX_PASSWORD;
  private readonly lengthMinPassword : number = LENGTH_MIN_PASSWORD;

  constructor(
    notification  : NotificationService,
    private fb    : FormBuilder,
    private cdRef : ChangeDetectorRef,
  ) { super(notification); }

  ngOnInit() {
    this.initForms();
  }

  // form

  onSubmit(form: FormGroup): void {
    this.submitted = true;

    if (form.valid) {
      // TODO
      this.showBtnLoading();

      // TODO: remove! call it after request
      setTimeout(() => {
        this.hideBtnLoading();
        this.showErrorMsg(this.notificationName, '<Notification Mock> Ocorreu um erro no servidor.');
      }, 1000);
    }
  }

  clearForm() {
    this.submitted = false;
    this.form.reset();
  }

  private initForms() {
    this.passwordField = new FormControl('', [
      Validators.required,
      Validators.minLength(this.lengthMinPassword),
      Validators.maxLength(this.lengthMaxPassword),
    ]);
    this.newPasswordField = new FormControl('', [
      Validators.required,
      Validators.minLength(this.lengthMinPassword),
      Validators.maxLength(this.lengthMaxPassword),
    ]);
    this.confirmPasswordField = new FormControl('', [
      Validators.required,
      Validators.minLength(this.lengthMinPassword),
      Validators.maxLength(this.lengthMaxPassword),
      TqValidators.isNotEqualToField(this.newPasswordField),
    ]);
    this.form = this.fb.group({
      passwordField: this.passwordField,
      newPasswordField: this.newPasswordField,
      confirmPasswordField: this.confirmPasswordField,
    });
  }

  // Button Loading

  private showBtnLoading() {
    this.isBtnLoading = true;
  }

  private hideBtnLoading() {
    this.isBtnLoading = false;
  }
}
