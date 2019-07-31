import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Checkbox } from 'widgets';

@Component({
  selector: 'tq-filter',
  template: require('./filter-sample.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilterSample {

  filterName  = 'Filter1';
  filter2Name = 'Filter2';

  filter = [
    new Checkbox('Item filtro A', false),
    new Checkbox('Item filtro B', false),
    new Checkbox('Item filtro C', false),
  ];

  filter2 = [
    new Checkbox('Item 2 filtro D', true),
    new Checkbox('Item 2 filtro E', true),
    new Checkbox('Item 2 filtro F', false),
    new Checkbox('Item 2 filtro G', false),
    new Checkbox('Item 2 filtro H', false),
  ];

  constructor() {}

  getFilterAfterChange(items: Checkbox[], item: Checkbox): Checkbox[] {
    item.checked = !item.checked;
    const i = items.indexOf(item);
    items = [
      ...items.slice(0, i),
      item,
      ...items.slice(i + 1),
    ];
    return items;
  }

  onFilterChange(items: Checkbox[], item: Checkbox) {
    this.filter = this.getFilterAfterChange(items, item);
  }

  onFilter2Change(items: Checkbox[], item: Checkbox) {
    this.filter2 = this.getFilterAfterChange(items, item);
  }

}
