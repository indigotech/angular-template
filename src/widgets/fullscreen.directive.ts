import { Component, Input, Output, EventEmitter } from '@angular/core';

let ANIMATION_DURATION = 0.3;

/**
 * A fullscreen modal
 */
@Component({
  selector: 'tq-fullscreen',
  template: require('./fullscreen.directive.pug'),
})
export class FullscreenDirective  {
  showFullscreen: boolean = false;
  showToggle: boolean = true;
  shouldTransition: boolean = false;

  /**
   * Defines the background color of the fullscreen.
   * Possible colors:
   * - 'white'
   * - 'gray'
   */
  @Input() color: string = 'white';

  /**
   * Fired when close button is clicked.
   * Output: Instance of directive
   */
  @Output() fullscreenClosed = new EventEmitter<boolean>();

  public close() {
    const timeoutDuration: number = ANIMATION_DURATION * 1000;

    this.showToggle = true;
    this.shouldTransition = false;
    setTimeout(() => {
      this.showFullscreen = false;
    }, timeoutDuration);

    this.fullscreenClosed.emit(true);
  }

  public open() {
    const timeoutDuration: number = ANIMATION_DURATION * 1000;

    this.showFullscreen = true;
    setTimeout(() => { this.shouldTransition = true; }, 0);
    setTimeout(() => {
      this.showToggle = false;
    }, timeoutDuration);

  }

}
