import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { dateTimeValidator, dateValidator } from './date-time.validator';

import { maxValueValidator }         from './max-value.validator';
import { alphanumericValidator }     from './alphanumeric.validator';
import { cnpjValidator }             from './cnpj.validator';
import { cpfValidator }              from './cpf.validator';
import { emailValidator }            from './email.validator';
import { creditCardDateValidator }   from './credit-card-date.validator';
import { isNotEqualToField }         from './is-not-equal';
import { postalcodeValidator }       from './postalcode.validator';
import { oneFieldRequiredValidator } from './one-field-required.validator';
import { creditCardNumberValidator } from './credit-card-number.validator';
import { isMultipleOfValidator }    from './is-multiple-of.validator';

export class TqValidators {

  static alphanumeric(): ValidatorFn {
    return alphanumericValidator();
  }

  static cnpjPattern(): ValidatorFn {
    return cnpjValidator();
  }

  static cpfPattern(): ValidatorFn {
    return cpfValidator();
  }

  static dateTime(format: string): ValidatorFn {
    return dateTimeValidator(format);
  }

  static datePattern(format: string): ValidatorFn {
    return dateValidator(format);
  }

  static emailPattern(): ValidatorFn {
    return emailValidator();
  }

  static maxValue(max: number): ValidatorFn {
    return maxValueValidator(max);
  }

  static postalcodePattern(): ValidatorFn {
    return postalcodeValidator();
  }

  static isNotEqualToField(value: FormControl): ValidatorFn {
    return isNotEqualToField(value);
  }

  static creditCardDate(): ValidatorFn {
    return creditCardDateValidator();
  }

  static creditCardNumber(): ValidatorFn {
    return creditCardNumberValidator();
  }

  static oneFieldRequired(group: FormGroup) {
    return oneFieldRequiredValidator(group);
  }

  static isMultipleOf(multiplier: number, base: number): ValidatorFn {
    return isMultipleOfValidator(multiplier, base);
  }

}
