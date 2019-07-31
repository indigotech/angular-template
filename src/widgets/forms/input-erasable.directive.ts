import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Provider,
  ViewChild,
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { Renderer } from '@tq-angular/render';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputErasableDirective),
  multi: true,
};

const IS_FOCUSED_DELAY: number = 200;

@Component({
  selector: 'tq-input-erasable',
  template: require('./input-erasable.directive.pug'),
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputErasableDirective implements ControlValueAccessor {

  /**
   * Defines the type of the input.
   * It's equal to 'text' if it has a mask.
   * Default: text
   */
  @Input() type: string = 'text';

  /**
   * Defines the id of the input
   */
  @Input('inputId') id: string;

  /**
   * Optional. Defines the label of the input
   */
  @Input() label: string;

  /**
   * Optional. Defines the placeholder of the input
   */
  @Input() placeholder: string;

  /**
   * Optional. Defines the mask of the input.
   * It uses the tq-input-mask directive.
   */
  @Input() mask: string = '';

  /**
   * Optional. Disables native browser autocomplete .
   * The support for this attribute is partial on almost all browsers.
   * See: https://caniuse.com/#feat=input-autocomplete-onoff
   */
  @Input() disableAutocomplete: boolean = false;

  // Input events
  @Output() inputErased = new EventEmitter();
  @Output() inputFocus  = new EventEmitter();
  @Output() inputBlur   = new EventEmitter();
  @Output() inputKeyUp  = new EventEmitter();

  @ViewChild('input') inputElRef: ElementRef;

  private isFocused: boolean = false;
  private isDisabled: boolean = false;

  private _inputValue: any = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};


  constructor(
    private renderer: Renderer,
    private cdRef: ChangeDetectorRef,
  ) {}

  // Public

  blur() {
    this.renderer.invokeElementMethod(this.inputElRef.nativeElement, 'blur', []);
  }
  focus() {
    this.renderer.invokeElementMethod(this.inputElRef.nativeElement, 'focus', []);
  }

  /**
   * Warning: Input should be enabled by FIELD_NAME.enable()
   **/
  enable() {
    this.isDisabled = false;
    this.renderer.setElementAttribute(this.inputElRef.nativeElement, 'disabled', null);
  }

  /**
   * Warning: Input should be disabled by FIELD_NAME.disable()
   **/
  disable() {
    this.isDisabled = true;
    this.renderer.setElementAttribute(this.inputElRef.nativeElement, 'disabled', 'true');
  }

  // From ControlValueAccessor interface
  // https://angular.io/docs/ts/latest/api/forms/index/ControlValueAccessor-interface.html

  writeValue(value: any) {
    this._inputValue = value;
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  // ngModel-form binding logic taken from:
  // http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

  get inputValue(): any {
    return this._inputValue;
  }
  set inputValue(value: any) {
    this._inputValue = value;
    this._onChangeCallback(value);
    this.cdRef.markForCheck();
  }

  private onFocus(ev: FocusEvent): void {
    this.inputFocus.emit(ev);

    // fix in order to both tap the btn and set isFocused false.
    setTimeout(() => {
      this.isFocused = true;
      this.cdRef.markForCheck();
    }, IS_FOCUSED_DELAY);
  }
  private onBlur(ev: FocusEvent): void {
    this._onTouchedCallback();
    this.inputBlur.emit(ev);

    // fix in order to both tap the btn and set isFocused false.
    // -> the btn is only shown when isFocused equals true.
    setTimeout(() => {
      this.isFocused = false;
      this.cdRef.markForCheck();
    }, IS_FOCUSED_DELAY);
  }

  // Private

  private onEraseClick(ev: MouseEvent): void {
    if (this.inputValue) {
      this.inputValue = '';
    }
    this.focus();
    this.inputKeyUp.emit(ev);
    this.inputErased.emit();
  }

  private onKeyUp(ev: KeyboardEvent): void {
    this.inputKeyUp.emit(ev);
  }

  private isVisible(): boolean {
    const isNotEmpty = this.inputValue && this.inputValue !== '';
    return (this.isFocused && isNotEmpty && !this.isDisabled);
  }

}
