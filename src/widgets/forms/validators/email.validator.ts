import { ValidatorFn, AbstractControl } from '@angular/forms';


export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    let v: string    = control.value;
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]{2}([a-z0-9-]*[a-z0-9])?)+$/i;

    if (v && v !== '' && !EMAIL_REGEXP.test(v)) {
      return { 'emailPattern': true };
    }

    return null;
  };

}
