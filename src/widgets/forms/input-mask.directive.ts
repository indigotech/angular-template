import { AfterViewInit, Directive, ElementRef, forwardRef, HostListener, Input, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PlatformService } from '@tq-angular/platform';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputMaskDirective),
  multi: true,
};


@Directive({
  selector: '[tq-input-mask]',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class InputMaskDirective implements AfterViewInit, ControlValueAccessor {

  /**
   * Defines the mask pattern
   */
  @Input('tq-input-mask') mask: string = '';


  private inputEl: HTMLInputElement;
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};

  @HostListener('input', ['$event']) onInputChange(ev) {
    let value = ev.target.value;

    if (this.platform.isBrowser()) {
      if (value !== null && this.mask === 'money') {
        value = VMasker.toMoney(value);
      } else if (this.mask !== null && this.mask !== '') {
        value = VMasker.toPattern(value, this.mask);
      }
    }

    this._onChangeCallback(value);
  }

  @HostListener('blur', ['$event']) onBlur(ev) {
    this._onTouchedCallback();
  }

  constructor(inputElement: ElementRef, private platform: PlatformService) {
    this.inputEl = inputElement.nativeElement;
  }

  ngAfterViewInit() {
    if (this.platform.isBrowser()) {
      if (this.mask === 'money') {
        VMasker(this.inputEl).maskMoney({
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          // zeroCents: true
        });
      } else if (this.mask !== '') {
        VMasker(this.inputEl).maskPattern(this.mask);
      }
    }
  }

  // model-dom binding logic taken from:
  // http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (this.platform.isBrowser()) {
      if (this.mask === 'money') {
        value = value || 0;
        value = VMasker.toMoney(value);
      } else if (value !== null && this.mask !== '') {
        value = VMasker.toPattern(value, this.mask);
      }
    }

    this.inputEl.value = value;

    // Fix to 'delay' the changeCallback fn
    setTimeout(() => { this._onChangeCallback(value); }, 0);

  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

}
