import { AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlatformService } from '@tq-angular/platform';
import { NotificationService, NotificationType } from 'app/modules/shared/notification';

export abstract class BaseFormDirective implements OnInit, AfterViewInit {

  shouldFocusFirstInput : boolean = true;
  focusFirstInput       : boolean = false;
  isBtnLoading          : boolean = false;
  submitted             : boolean = false;

  form                  : FormGroup;

  constructor(
    public cdRef        : ChangeDetectorRef,
    public notification : NotificationService,
    protected platform  : PlatformService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    if (this.shouldFocusFirstInput) {
      this.focusForm();
    }
  }

  // Public

  focusForm() {
    if (this.platform.isBrowser()) {
      this.focusFirstInput = false;
      setTimeout(() => {
        this.focusFirstInput = true;
        this.cdRef.markForCheck();
      }, 400);
    }
  }

  setFormSubmittted() {
    this.submitted = true;
    this.cdRef.markForCheck();
  }

  isSubmitted(): boolean {
    return this.submitted;
  }

  isValid(): boolean {
    return this.form ? this.form.valid : true;
  }

  getFormValue(): any {
    // https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html#!#getRawValue-anchor
    let form = this.form.getRawValue();
    return form;
  }

  clearForm() {
    this.submitted = false;
    this.form.reset();
    this.hideBtnLoading();
    this.cdRef.markForCheck();
  }

  // Msg

  showErrorMsg(name: string, message: string, persistent?: boolean) {
    if (this.platform.isBrowser()) {
      window.scrollTo(0, 0);
      this.cdRef.markForCheck();
    }
    this.notification.show(name, message, 'error', persistent);
  }

  showSuccessMsg(name: string, message: string, persistent?: boolean) {
    if (this.platform.isBrowser()) {
      window.scrollTo(0, 0);
      this.cdRef.markForCheck();
    }
    this.notification.show(name, message, 'success', persistent);
  }

  hideMsg(name: string) {
    this.notification.hide(name);
  }

  // Btn loading

  showBtnLoading() {
    this.isBtnLoading = true;
    this.cdRef.markForCheck();
  }

  hideBtnLoading() {
    // angular-universal is breaking when rendering objects in DOM (a bug which should be fixed in next relesase)
    // in the meantime we have to avoid this bug otherwise the seo does not work
    if (this.platform.isBrowser()) {
      this.isBtnLoading = false;
      this.cdRef.markForCheck();
    }
  }

  protected abstract initForm();
}
