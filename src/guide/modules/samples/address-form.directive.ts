import { AfterViewInit, Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PlatformService } from '@tq-angular/platform';

import { TqValidators } from 'widgets/forms';
import { AnimationScaleUp } from 'widgets';

import { BaseFormDirective } from 'app/core';
import { NotificationService } from 'app/modules/shared/notification';

@Component({
  selector: 'tq-address-form',
  providers: [],
  template: require('./address-form.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ AnimationScaleUp ],
})

export class AddressFormDirective extends BaseFormDirective implements AfterViewInit {
  private readonly notificationName : string = 'address-form';

  private postalCodeField : FormControl;
  private addressField    : FormControl;
  private numberField     : FormControl;
  private complementField : FormControl;
  private cityField       : FormControl;
  private stateField      : FormControl;

  @Input() submitBtnText: string = 'Salvar';

  constructor(
    cdRef        : ChangeDetectorRef,
    notification : NotificationService,
    platform     : PlatformService,
    private fb   : FormBuilder,
  ) { super(cdRef, notification, platform); }

  // BaseFormDirective

  initForm() {
    this.postalCodeField = this.fb.control('', [
      Validators.required,
      TqValidators.postalcodePattern(),
    ]);
    this.addressField = this.fb.control('', [
      Validators.required,
      TqValidators.alphanumeric(),
    ]);
    this.numberField = this.fb.control('', [
      Validators.required,
    ]);
    this.complementField = this.fb.control('');
    this.cityField = this.fb.control('', [
      Validators.required,
    ]);
    this.stateField = this.fb.control('', [
      Validators.required,
    ]);

    this.form = this.fb.group({
      postalCodeField : this.postalCodeField,
      addressField    : this.addressField,
      numberField     : this.numberField,
      complementField : this.complementField,
      cityField       : this.cityField,
      stateField      : this.stateField,
    });

  }

  private onSubmit(form: FormGroup): void {
    this.setFormSubmittted();

    if (this.isValid()) {
      this.showBtnLoading();
      this.saveAddress(this.getFormValue());
    } else {
      // TODO scroll to first input with error
      // if (isBrowser) {
      //   window.scrollTo(0,0);
      // }
    }
  }

  private saveAddress(value: any) {
    // TODO remove! call if after request
    setTimeout(() => {
      this.showErrorMsg(this.notificationName, '<Notification Mock> Ocorreu um erro no servidor.');
      this.clearForm();
      this.hideBtnLoading();
    }, 1000);
  }
}
