import { Component, Input } from '@angular/core';

import { TabItemDirective, TabHeadingDirective }  from './';
import { TranscludeDirective }  from './utils/tq-transclude.directive';

@Component({
  selector: 'tq-tabs',
  template: require('./tabs.directive.pug'),
})
export class TabsDirective {
  public tabs: Array<TabItemDirective> = [];

  @Input() public classes: string;

  addTab(tab: TabItemDirective) {
    // Activate the first tab as default
    if (this.tabs.length === 0) {
      tab.active = true;
    }

    this.tabs.push(tab);
  }

  selectTab(tab: TabItemDirective) {
    this.tabs.forEach((t) => t.active = false );
    tab.active = true;
  }
}
