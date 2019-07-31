import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputBaseDirective, TqValidators } from 'widgets/forms';

import { AnimationScaleUp } from 'widgets';
import { BaseFormDirective } from 'app/core';
import { NotificationService } from 'app/modules/shared/notification';
import { PlatformService } from '@tq-angular/platform';

@Component({
  selector: 'tq-card-form',
  providers: [],
  template: require('./card-form.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ AnimationScaleUp ],
})

export class CardFormDirective extends BaseFormDirective implements AfterViewInit {
  private readonly notificationName : string = 'card-form';

  private creditCardField     : FormControl;
  private cardholderNameField : FormControl;
  private cvvField            : FormControl;
  private expirationDateField : FormControl;

  @Input() submitBtnText: string = 'Salvar';

  constructor(
    cdRef        : ChangeDetectorRef,
    notification : NotificationService,
    platform     : PlatformService,
    private fb   : FormBuilder,
  ) { super(cdRef, notification, platform); }

  // Form

  initForm() {
    this.creditCardField = this.fb.control('', [
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(23),
      TqValidators.creditCardNumber(),
    ]);
    this.cardholderNameField = this.fb.control('',
      Validators.required,
    );
    this.cvvField = this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.pattern('^[0-9]*'),
    ]);
    this.expirationDateField = this.fb.control('', [
      Validators.required,
      TqValidators.datePattern('MM/YYYY'),
      TqValidators.creditCardDate(),
    ]);

    this.form = this.fb.group({
      creditCardField     : this.creditCardField,
      cardholderNameField : this.cardholderNameField,
      cvvField            : this.cvvField,
      expirationDateField : this.expirationDateField,
    });

  }

  private onSubmit(form: FormGroup): void {
    this.setFormSubmittted();

    if (this.isValid()) {
      this.showBtnLoading();
      this.saveCard(this.getFormValue());
    } else {
      // TODO scroll to first input with error
      // if (isBrowser) {
      //   window.scrollTo(0,0);
      // }
    }
  }

  private saveCard(value: any) {
    // TODO remove! call if after request
    setTimeout(() => {
      this.showErrorMsg(this.notificationName, '<Notification Mock> Ocorreu um erro no servidor.');
      this.clearForm();
      this.hideBtnLoading();
    }, 1000);
  }
}
