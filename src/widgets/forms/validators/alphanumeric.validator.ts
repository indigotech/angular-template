import { ValidatorFn, AbstractControl } from '@angular/forms';


export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    let v: string    = control.value;
    let CPF_REGEXP = /^[a-zA-Z0-9]*$/i;

    if (v && v !== '' && !CPF_REGEXP.test(v)) {
      return { 'alphanumeric': true };
    }

    return null;
  };

}
