import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';

/*
 * Menu item and subitem classes
 */
export class MenuSubItem {
  constructor(public name: string,
              public routerLink: string,
              public iconName: string,
            ) { }
}
export class MenuItem {
  constructor(public name: string,
              public items: MenuSubItem[],
              public routerLink: string,
            ) { }
}

@Directive({
  selector: '[menu-gestures]',
})

export class MenuGesturesDirective implements AfterViewInit, OnDestroy {
  @Output() swipeLeftGesture = new EventEmitter();
  @Output() swipeRightGesture = new EventEmitter();

  private hammer: HammerManager = undefined;

  constructor(
    private el: ElementRef,
    private platform: PlatformService,
  ) { }


  ngAfterViewInit() {

    if (!this.hammer && this.platform.isBrowser()) {
      this.hammer = new Hammer(this.el.nativeElement);

      // Disabling gestures that are enabled by default, but not used in this directive
      this.hammer.get('doubletap').set({ enable: false });
      this.hammer.get('tap').set({ enable: false });
      this.hammer.get('press').set({ enable: false });
      this.hammer.get('pan').set({ enable: false });

      this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
      this.hammer.on('swipeleft', (ev) => {
        this.swipeLeftGesture.emit({ ev: ev, dir: 'left' });
      });
      this.hammer.on('swiperight', (ev) => {
        this.swipeRightGesture.emit({ ev: ev, dir: 'right' });
      });

    }
  }

  ngOnDestroy() {
    if (this.hammer) {
      this.hammer.destroy();
      this.hammer = undefined;
    }
  }

}
