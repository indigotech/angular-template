import { Pipe, PipeTransform } from '@angular/core';

export class Checkbox {
  constructor(public text: string,
              public checked: boolean) {
  }
}

@Pipe({
  name: 'filterChecked',
  pure: true,
})

export class FilterCheckedPipe implements PipeTransform {
  transform(items: Checkbox[]) {
    return items.filter(checkbox => checkbox.checked);
  }
}
