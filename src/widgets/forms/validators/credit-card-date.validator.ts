import * as _ from 'custom-lodash';
import * as moment from 'moment-timezone';

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function creditCardDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const PATTERN = /([0-9]{2})\/([0-9]{4})/;

    let v = control.value;
    let cardDate, cardDay, cardMonth, cardYear, cardDateFormatted, currentDateFormatted;
    cardDay = moment().format('DD');
    currentDateFormatted = moment().format('YYYY-MM-DD');

    if (v && v !== '' && PATTERN.test(v)) {
      cardDate = PATTERN.exec(v);
      cardMonth = cardDate[1];
      cardYear = cardDate[2];
      cardDateFormatted = cardYear + '-' + cardMonth + '-' + cardDay;

      if (moment(cardDateFormatted).isSameOrAfter(currentDateFormatted)) {
        return null;
      } else {
        return {'creditCardDate': true};
      }
    }
  };
}
