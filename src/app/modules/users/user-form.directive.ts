import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PlatformService } from '@tq-angular/platform';

import { TqValidators, InputBaseDirective, areDifferent } from 'widgets/forms';
import { LENGTH_MAX_EMAIL, LENGTH_MAX_PHONE, LENGTH_MIN_PHONE, LENGTH_MAX_PASSWORD, LENGTH_MIN_PASSWORD } from 'widgets/forms';

import { AnimationScaleUp, AnimationFadeIn } from 'widgets';

import { BaseFormDirective } from 'app/core';

import { NotificationService } from 'app/modules/shared/notification';

@Component({
  selector: 'user-form',
  providers: [],
  template: require('./user-form.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ AnimationScaleUp, AnimationFadeIn ],
})

export class UserFormDirective extends BaseFormDirective implements AfterViewInit {

  private emailField            : FormControl;
  private nameField             : FormControl;
  private regionField           : FormControl;
  private dateField             : FormControl;
  private phoneField            : FormControl;
  private rgField               : FormControl;
  private cpfField              : FormControl;
  private matchingPasswordGroup : FormGroup;
  private passwordField         : FormControl;
  private confirmPasswordField  : FormControl;

  private readonly lengthMaxPassword : number = LENGTH_MAX_PASSWORD;
  private readonly lengthMinPassword : number = LENGTH_MIN_PASSWORD;
  private readonly lengthMaxEmail    : number = LENGTH_MAX_EMAIL;
  private readonly lengthMaxPhone    : number = LENGTH_MAX_PHONE;
  private readonly lengthMinPhone    : number = LENGTH_MIN_PHONE;

  private readonly notificationName : string = 'user-form';

  @Input() submitBtnText: string = 'Salvar';

  @ViewChild('email') email: InputBaseDirective;

  constructor(
    platform     : PlatformService,
    cdRef        : ChangeDetectorRef,
    notification : NotificationService,
    private fb   : FormBuilder,
  ) { super(cdRef, notification, platform); }

  // Form

  onSubmit(form: FormGroup): void {
    this.setFormSubmittted();

    if (this.isValid()) {
      this.showBtnLoading();
      this.saveUser(this.getFormValue());
    } else {
      // TODO scroll to first input with error
      if (this.platform.isBrowser()) {
        window.scrollTo(0, 0);
      }
    }
  }

  protected initForm() {
    this.nameField = this.fb.control('',  [
      Validators.required,
      Validators.maxLength(128),
    ]);
    this.emailField = this.fb.control('',  [
      Validators.required,
      TqValidators.emailPattern(),
      Validators.maxLength(this.lengthMaxEmail),
    ]);
    this.phoneField = this.fb.control('',  [
      Validators.required,
      Validators.minLength(this.lengthMinPhone),
      Validators.maxLength(this.lengthMaxPhone),
    ]);
    this.dateField = this.fb.control('', [
      Validators.required,
      TqValidators.datePattern('DD/MM/YYYY'),
      TqValidators.dateTime('DD/MM/YYYY'),
    ]);
    this.rgField = this.fb.control('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9.-]*$'),
    ]);
    this.cpfField = this.fb.control('', [
      Validators.required,
      Validators.pattern('([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})'),
    ]);

    this.passwordField = this.fb.control('', [
      Validators.required,
      Validators.minLength(this.lengthMinPassword),
      Validators.maxLength(this.lengthMaxPassword),
    ]);
    this.confirmPasswordField = this.fb.control('', Validators.required);
    this.matchingPasswordGroup = this.fb.group({
      passwordField       : this.passwordField,
      confirmPasswordField: this.confirmPasswordField,
    }, {validator: areDifferent});

    this.form = this.fb.group({
      nameField : this.nameField,
      emailField: this.emailField,
      dateField : this.dateField,
      phoneField: this.phoneField,
      rgField   : this.rgField,
      cpfField  : this.cpfField,
      matchingPasswordGroup: this.matchingPasswordGroup,
    });

  }

  private saveUser(value: any) {
    // TODO remove! call if after request
    setTimeout(() => {
      this.showErrorMsg(this.notificationName, '<Notification Mock> Ocorreu um erro no servidor.');
      this.clearForm();
      this.hideBtnLoading();
    }, 1000);
  }
}
