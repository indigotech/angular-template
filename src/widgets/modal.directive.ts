import { AfterViewInit, Component, HostBinding, Input, Inject, Output, EventEmitter } from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

@Component({
  selector: 'tq-modal',
  template: require('./modal.directive.pug'),
})
export class ModalDirective  {

  /**
   * Fired when close button is clicked.
   * Output: Instance of directive
   */
  @Output() modalClosed = new EventEmitter<boolean>();

  /**
   * Sets if modal is visible or not.
   */
  @HostBinding ('class.is-open')
  @Input() isOpen: boolean = false;

  @HostBinding ('class.modal') true;

  constructor(
    private renderer: Renderer,
    @Inject(DOCUMENT) private document,
    private platform: PlatformService,
  ) {}

  ngAfterViewInit() {
    this.toggle();
  }

  public close() {
    this.isOpen = false;
    this.toggle();
    this.modalClosed.emit(true);
  }

  public open() {
    this.isOpen = true;
    this.toggle();
  }

  private toggle() {
    let overflow = this.isOpen ? 'hidden' : 'scroll';

    if (this.platform.isBrowser()) {
      // It is not recommended to access parent elements in the DOM
      // But this is a much simpler way to prevent scroll in the content
      this.renderer.setElementStyle(
        this.document.querySelector('body'),
        'overflow-y',
        overflow,
      );
    }
  }
}
