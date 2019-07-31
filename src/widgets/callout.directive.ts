import { Component, Input } from '@angular/core';

@Component({
  selector: 'tq-callout',
  template: require('./callout.directive.pug'),
})
export class CalloutDirective  {

  /**
   * Defines the type of flash message.
   * Possible types:
   * - 'info' (.flsh--info).
   * - 'warning' (.flsh--warning).
   * - 'success' (.flsh--success).
   * - 'error' (.flsh--error).
   */
  @Input() type: string = 'info';

  /**
   * Defines the title to be shown.
   */
  @Input() title: string;
  /**
   * Defines the message to be shown.
   */
  @Input() description: string;

  /**
   * Sets if flash message is visible or not.
   */
  @Input() isClosed: boolean = false;

  constructor() {
  }
}
