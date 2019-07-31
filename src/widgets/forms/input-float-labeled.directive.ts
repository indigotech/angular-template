import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  ElementRef,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { ControlValueAccessor,
  NG_VALUE_ACCESSOR } from '@angular/forms';

import { Renderer } from '@tq-angular/render';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFloatLabeledDirective),
  multi: true,
};

const ENTER_KEYCODE = 13;

@Component({
  selector: 'tq-input-float-labeled',
  template: require('./input-float-labeled.directive.pug'),
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputFloatLabeledDirective implements ControlValueAccessor {

  /**
   * Defines when the input should focus
   */
  @Input() focusInput: boolean = false;

  /**
   * Defines the type of the input.
   * Default: text.
   * Other options: tel, email, password.
   */
  @Input() type: string = 'text';

  /**
   * Defines the id of the input.
   */
  @Input('inputId') id: string;

  /**
   * Defines the label of the input.
   * Default: Type your text here.
   */
  @Input() label: string = 'Type your text here';

  /**
   * Optional. Defines the input decoration icon classes.
   * !Attention: material-icons need to be transformed into classes
   */
  @Input() iconDecorationClasses: string = undefined;

  /**
   * Optional. Defines the mask of the input.
   * It uses the tq-input-mask directive.
   */
  @Input() mask: string = '';

  // Input events

  @Output() inputFocus  = new EventEmitter();
  @Output() inputBlur   = new EventEmitter();
  @Output() inputKeyUp  = new EventEmitter();

  @ViewChild('input') inputElRef: ElementRef;

  private shouldFloat : boolean = false;
  private isFocused   : boolean = false;
  private isDisabled  : boolean = false;

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
    this.shouldFloat = value && value !== '';
    this.cdRef.markForCheck();
  }

  private onFocus(ev: FocusEvent): void {
    this.isFocused = true;
    this.inputFocus.emit(ev);
  }
  private onBlur(ev: FocusEvent): void {
    this.isFocused = false;
    this._onTouchedCallback();
    this.inputBlur.emit(ev);
  }

  // Private

  private onEraseClick(ev: MouseEvent): void {
    if (this.inputValue) {
      this.inputValue = '';
    }
    this.inputKeyUp.emit(ev);
    this.focus();
  }

  private onKeyUp(ev: KeyboardEvent): void {
    if (ev.keyCode === ENTER_KEYCODE) {
      this.blur();
    }
    this.inputKeyUp.emit(ev);
  }

}
