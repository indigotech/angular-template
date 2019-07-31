import { ValidatorFn, AbstractControl } from '@angular/forms';
const luhn = require('luhn');

export function creditCardNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    // Regex para limpar todos os espaços entre os grupos de numeros o cartão de crédito
    const PATTERN = /[\s\b\r ]+/ig;
    let v = control.value;
    let isValid: boolean = false;

    if (v && v !== null) {
      v = control.value.replace(PATTERN, '');
      isValid = luhn.validate(v);
    }

    return isValid ? null : { 'creditCardNumber': true };

  };
}
