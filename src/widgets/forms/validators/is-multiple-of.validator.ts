import { ValidatorFn, AbstractControl } from '@angular/forms';

function isMultipleOf(v: string = '0', multiplier: number, base: number): boolean {
  let value = parseFloat(v.replace(',', '.'));
  let result = value * base;
  if (result % multiplier !== 0) {
    return false;
  }
  return true;
}

export function isMultipleOfValidator(multiplier: number, base: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let isMultiple: boolean = isMultipleOf(control.value, multiplier, base);
    if (!isMultiple) {
      return { 'isMultipleOf': true };
    }
    return null;
  };
}
