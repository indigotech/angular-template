import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AnimationScaleUp } from 'widgets';

@Component({
  selector: 'tq-flash',
  template: require('./flash.directive.pug'),
  animations: [ AnimationScaleUp ],
})
export class FlashDirective  {

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
   * Defines the message to be shown.
   */
  @Input() description: string = undefined;

  /**
   * Fired when close button is clicked.
   * Output: Instance of directive
   */
  @Output() isClosedChange = new EventEmitter<boolean>();

  /**
   * Sets if flash message has close button or not.
   * Default is to show close btn.
   */
  @Input() isDimissible: boolean = true;

  private onClose() {
    this.description = undefined;
    this.isClosedChange.emit(true);
  }
}
