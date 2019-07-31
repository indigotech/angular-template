import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

export function isNotEqualToField(formControl: FormControl): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {

    const inputValue: string = control.value;

    if (inputValue != null && inputValue.length > 0 && formControl.value !== inputValue) {
      return { 'isNotEqual' : true};
    }

    return null;
  };

}
