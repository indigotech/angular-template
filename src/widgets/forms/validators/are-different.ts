import { FormGroup } from '@angular/forms';

export function areDifferent(group: FormGroup) {
  let value: string = '';

  for (let name in group.controls) {
    if (group.controls.hasOwnProperty(name)) {
      if (value === '') {
        value = group.controls[name].value;
      }
      if (value !== group.controls[name].value) {
        return { areDifferent: true };
      }
    }
  }

  return null;
}
