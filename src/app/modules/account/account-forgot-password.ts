import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PlatformService } from '@tq-angular/platform';

import { BaseFormDirective } from 'app/core';
import { NotificationService } from 'app/modules/shared/notification';

import { AnimationScaleUp } from 'widgets';
import { TqValidators, LENGTH_MAX_EMAIL } from 'widgets/forms';

@Component({
  selector: 'forgot-password',
  template: require('./account-forgot-password.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ AnimationScaleUp ],
})

export class AccountForgotPassword extends BaseFormDirective {

  @Output() onForgotPasswordSubmit = new EventEmitter();

  private readonly notificationName : string = 'account-forgot-password';

  private readonly lengthMaxEmail: number = LENGTH_MAX_EMAIL;

  constructor(
    cdRef        : ChangeDetectorRef,
    notification : NotificationService,
    platform     : PlatformService,
    private fb   : FormBuilder,
  ) {
    super(cdRef, notification, platform);
  }

  // Submit

  onSubmit(form: FormGroup): void {
    this.setFormSubmittted();

    if (this.isValid()) {
      this.showBtnLoading();
      this.onForgotPasswordSubmit.emit(form);
    }
  }

  // Private
  protected initForm() {
    this.form = this.fb.group({
      emailField: ['', [
        Validators.required,
        TqValidators.emailPattern(),
        Validators.maxLength(this.lengthMaxEmail),
      ]],
    });
  }
}
