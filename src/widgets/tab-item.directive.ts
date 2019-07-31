import { Component, Input, Injectable, TemplateRef } from '@angular/core';

import { TabsDirective }  from '../widgets';

@Component({
  selector: 'tq-tab-item',
  template: require('./tab-item.directive.pug'),
})

@Injectable()
export class TabItemDirective {
  public active: boolean;
  public headingTemplateRef: TemplateRef<any>;

  @Input() public title: string;
  @Input() public classes: string = '';

  constructor(
    private tabs: TabsDirective,
  ) {
    this.tabs.addTab(this);
  }
}
