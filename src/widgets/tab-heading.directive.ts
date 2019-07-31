import { Directive, TemplateRef, Input } from '@angular/core';

import { TabItemDirective } from './';

@Directive({
  selector: '[tq-tab-item-heading]',
})
export class TabHeadingDirective {
  public constructor(headingTemplateRef: TemplateRef<any>, tabItem: TabItemDirective) {
    tabItem.headingTemplateRef = headingTemplateRef;
  }
}
