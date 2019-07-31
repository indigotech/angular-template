import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'custom-lodash';

function getCpfDigitsArrayFromString(cpfString: string): number[] {
  return _.map(cpfString.replace(/\D/g, ''), digit => +digit);
}

function verificatorDigit(cpfDigits: number[], endArray: number, multiple: number): number {
  let sum = 0;
  for (let j = 0; multiple >= endArray; multiple--, j++) {
    sum += multiple * cpfDigits[j];
  }

  let calculatedDigit : number = (sum * 10) % 11;

  if (calculatedDigit >= 10) {
    return 0;
  } else {
    return calculatedDigit;
  }
}

function allDigitsAreEqual(cpfDigits: number[]): boolean {
  for (let i = 1; i < cpfDigits.length; i++) {
    if (cpfDigits[i] !== cpfDigits[i - 1]) {
      return false;
    }
  }
  return true;
}

function isFirstVerificationDigitValid(cpfDigits: number[]): boolean {
  return verificatorDigit(cpfDigits, 2, 10) === cpfDigits[9];
}

function isSecondVerificationDigitValid(cpfDigits: number[]): boolean {
  return verificatorDigit(cpfDigits, 2, 11) === cpfDigits[10];
}

function isCpfValid(cpf: string) {
  const CPF_REGEXP = /^([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})$/i;

  const cpfDigits = getCpfDigitsArrayFromString(cpf);

  return CPF_REGEXP.test(cpf) &&
        !allDigitsAreEqual(cpfDigits) &&
        isFirstVerificationDigitValid(cpfDigits) &&
        isSecondVerificationDigitValid(cpfDigits);
}

export function cpfValidator(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {

    const inputValue: string = control.value;

    if (!inputValue || inputValue.length === 0 || isCpfValid(inputValue)) {
      return null;
    } else {
      return { 'cpfPattern': true };
    }
  };
}
