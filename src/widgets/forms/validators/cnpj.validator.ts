import { ValidatorFn, AbstractControl } from '@angular/forms';


export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    let v: string    = control.value;
    let CNPJ_REGEXP = /^([0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[\-][0-9]{2})$/i;

    if (v && v !== '' && !CNPJ_REGEXP.test(v)) {
      return { 'cnpjPattern': true };
    }

    return null;
  };

}
