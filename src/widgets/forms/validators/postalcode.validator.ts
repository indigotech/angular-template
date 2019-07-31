import { ValidatorFn, AbstractControl } from '@angular/forms';


export function postalcodeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    let v: string    = control.value;
    let ZIPCODE_REGEXP = /^([0-9]{5}[-][0-9]{3})$/i;

    if (v && v !== '' && !ZIPCODE_REGEXP.test(v)) {
      return { 'postalcodePattern': true };
    }

    return null;
  };

}
