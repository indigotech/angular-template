import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maxValueValidator(max: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    let v: number = parseInt(control.value, 0);

    if (isNaN(v)) { return null; }

    return (v > max) ? {'maxValue': true} : null;
  };
}
