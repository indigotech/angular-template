import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { PlatformService } from '@tq-angular/platform';
import { TqValidators } from 'widgets/forms';
import { AnimationScaleUp } from 'widgets';
import { BaseFormDirective } from 'app/core';
import { NotificationService } from 'app/modules/shared/notification';

@Component({
  selector: 'tq-user-form',
  template: require('./user-form.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ AnimationScaleUp ],
})

export class UserFormDirective extends BaseFormDirective implements AfterViewInit {
  public userForm : FormGroup;
  public matchingTelephoneNumbersGroup : FormGroup;
  public nameField: FormControl;
  public emailField: FormControl;
  public telephoneField: FormControl;
  public mobileField: FormControl;

  @Input() submitBtnText: string = 'Salvar';

  constructor(
    cdRef: ChangeDetectorRef,
    notification: NotificationService,
    platform: PlatformService,
    private fb: FormBuilder,
  ) { super(cdRef, notification, platform); }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.nameField = this.fb.control('', [
      Validators.required,
    ]);
    this.emailField = this.fb.control('', [
      Validators.required,
      TqValidators.emailPattern(),
    ]);
    this.telephoneField = this.fb.control('', [
      Validators.pattern('[\\(][0-9]{2}[\\)][\\s][0-9]{4}[-][0-9]{4}'),
      Validators.maxLength(14), // (99) 9999-9999 : 10 numbers + 4 mask
    ]);
    this.mobileField = this.fb.control('', [
      Validators.pattern('[\\(][0-9]{2}[\\)][\\s][0-9]{5}[-][0-9]{4}'),
      Validators.maxLength(15), // (99) 99999-9999 : 11 numbers + 4 mask
    ]);

    this.matchingTelephoneNumbersGroup = this.fb.group({
      telephoneField: this.telephoneField,
      mobileField: this.mobileField,
    }, { validator: TqValidators.oneFieldRequired });

    this.form = this.fb.group({
      nameField: this.nameField,
      emailField: this.emailField,
      matchingTelephoneNumbersGroup: this.matchingTelephoneNumbersGroup,
    });
  }

  private onSubmit(form: FormGroup): void {
    this.setFormSubmittted();

    if (this.isValid()) {
      this.showBtnLoading();
      this.saveUser(this.getFormValue());
    }
  }

  private saveUser(value: any) {
    // TODO remove! call if after request
    setTimeout(() => {
      this.clearForm();
      this.hideBtnLoading();
    }, 1000);
  }

}
