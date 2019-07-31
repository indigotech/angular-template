import { FormGroup } from '@angular/forms';

export const oneFieldRequiredValidator = (group: FormGroup) => {
  let isOneFieldFilled = false;
  if (group && group.controls) {
    for (const control in group.controls) {
      if (group.controls.hasOwnProperty(control) && group.controls[control].valid && group.controls[control].value) {
        isOneFieldFilled = true;
        break;
      }
    }
  }
  return isOneFieldFilled ? null : { 'oneFieldRequired': true };
};
