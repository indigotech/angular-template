import { Component, HostBinding, Input, ViewChild, AfterViewInit } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

const MAX_MOBILE_WIDTH = 991;

@Component({
  selector: 'tq-dropdown',
  template: require('./dropdown.directive.pug'),
})

export class DropdownDirective implements AfterViewInit {

  /**
   * DropdownListContainer sets the max-height of the body
   * in order to open/close the dropdown.
   */
  @ViewChild('dropdownListContainer') dropdownListContainer;

  /**
   * We get the body height from DropdownList.
   */
  @ViewChild('dropdownList') dropdownList;

  /**
   * Shows if dropdown-list is open or not.
   */
  @HostBinding('class.dropdown-list-is-open') isOpen: boolean = false;

  @Input() alignRight: boolean = false;

  @Input() autoExpand: boolean = true;


  constructor(
    private renderer: Renderer,
    private platform: PlatformService,
  ) {}

  ngAfterViewInit() {
    if (this.platform.isBrowser()) {
      this.close();
    }
  }

  public toggleOpen() {
    let isNotMobile : boolean = false;
    if (this.platform.isBrowser()) {
      isNotMobile = window.innerWidth > MAX_MOBILE_WIDTH;
    }
    if (this.autoExpand && isNotMobile) return;

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  public close() {
    if (this.isOpen) {
      setTimeout(() => {
        this.toggleOpen();
      }, 100);
    }
  }

  private onListTap() {
    this.close();
  }

  private expand() {
    this.renderer.setElementStyle(
      this.dropdownListContainer.nativeElement,
      'maxHeight',
      this.dropdownList.nativeElement.offsetHeight + 'px',
    );
  }

  private collapse() {
    this.renderer.setElementStyle(
      this.dropdownListContainer.nativeElement,
      'maxHeight',
      '0',
    );
  }

}
