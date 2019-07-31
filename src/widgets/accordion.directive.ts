import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AccordionItemDirective } from './';

@Component({
  selector: 'tq-accordion',
  template: require('./accordion.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AccordionDirective {

  /**
   * Sets if accordion should open only one item at a time or not.
   */
  @Input() oneItemAtATime: boolean = false;

  private items: Array<AccordionItemDirective> = [];

  public closeOtherItems(openItem: AccordionItemDirective): void {
    if (!this.oneItemAtATime) {
      return;
    }

    this.items.forEach((item: AccordionItemDirective) => {
      if (item !== openItem && item.isOpen) {
        item.toggleOpen();
      }
    });
  }

  public addItem(item: AccordionItemDirective): void {
    this.items.push(item);
  }

}
