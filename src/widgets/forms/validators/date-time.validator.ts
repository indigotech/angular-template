import * as moment                      from 'moment-timezone';

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateTimeValidator(format: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    let v: string                = control.value;
    if (v === '') { return null; }

    let isValidDateTime: boolean = moment(v, format).isValid();
    return isValidDateTime ? null : {'dateTimeValue': true};
  };

}

export function dateValidator(format: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    let v: string    = control.value;

    let DATE_REGEXP = /^([0-9]{2}[\/][0-9]{2}[\/][0-9]{4})$/i;
    switch (format) {
      case 'DD/MM/YY':
        DATE_REGEXP = /^([0-9]{2}[\/][0-9]{2}[\/][0-9]{2})$/i;
        break;
      case 'DD/MM':
        DATE_REGEXP = /^([0-9]{2}[\/][0-9]{2})$/i;
        break;
      case 'MM/YY':
        DATE_REGEXP = /^([0-9]{2}[\/][0-9]{2})$/i;
        break;
      case 'MM/YYYY':
        DATE_REGEXP = /^([0-9]{2}[\/][0-9]{4})$/i;
        break;
      default:
        break;
    }

    if (v && v !== '' && !DATE_REGEXP.test(v)) {
      return { 'datePattern': true };
    }

    return null;
  };

}
