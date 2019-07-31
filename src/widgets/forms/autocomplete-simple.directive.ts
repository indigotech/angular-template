import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputErasableDirective } from 'widgets';

import { AutocompleteItemViewModel } from './';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteSimpleDirective),
  multi: true,
};

@Component({
  selector: 'tq-autocomplete-simple',
  template: require('./autocomplete-simple.directive.pug'),
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSimpleDirective implements OnInit, ControlValueAccessor {

  @Input('inputId') id: string = 'autocompleteInput';

  @Input() hasError: boolean = false;
  @Input() caption: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Input() filteredArray: AutocompleteItemViewModel[] = [];

  private searchForm: FormGroup;
  private searchField: FormControl;
  private idField: FormControl;

  private autocompleteIsShown: boolean = false;

  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};

  @ViewChild('input') input: InputErasableDirective;

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.searchField  = this.fb.control('', Validators.required);
    this.idField      = this.fb.control('');
    this.searchForm   = this.fb.group({ idField: this.idField, searchField: this.searchField });
  }

  // Item tap
  private itemTap(ev: any) {
    this.searchField.setValue(ev.title);
    this._onChangeCallback(ev);
    this.input.focus();
  }

  // Search
  onSubmit(form: FormGroup): void {
    if (form.valid) {
      // TODO search
    }
  }

  setFilteredArray(results: AutocompleteItemViewModel[]) {
    this.filteredArray = results.splice(0, 5);
    this.autocompleteIsShown = true;
    this.cdRef.markForCheck();
  }

  // Input: Keyup, blur, focus
  onKeyUp(ev: KeyboardEvent) {
    this._onChangeCallback(this.searchField.value);

    let atLeastThreeDigits = this.searchField.value.length > 2;
    let noDigits = this.searchField.value.length === 0;

    if (atLeastThreeDigits) {
      // TODO update real filteredArray
      this.setFilteredArray(this.filteredArray);
    } else if (noDigits) {
      this.autocompleteIsShown = false;
    }
  }

  onFocus(ev: FocusEvent) {
    let atLeastThreeDigits = this.searchField.value.length > 2;
    this.autocompleteIsShown = atLeastThreeDigits;
  }

  onBlur(ev: FocusEvent) {
    this._onTouchedCallback();
    setTimeout(() => {
      this.autocompleteIsShown = false;
      this.cdRef.markForCheck();
    }, 250);
  }

  // ngModel-form binding logic taken from:
  // http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

  // From ControlValueAccessor interface
  // https://angular.io/docs/ts/latest/api/forms/index/ControlValueAccessor-interface.html

  writeValue(obj: AutocompleteItemViewModel) {
    if (obj) {
      this.idField.setValue(obj.id);
      this.searchField.setValue(obj.title);
    }
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
      this.searchField.disable();
    } else {
      this.searchField.enable();
    }
  }

}
