import { AfterViewInit, Component, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';

@Directive({
  selector: '[orbit-gestures]',
})

export class OrbitGesturesDirective implements AfterViewInit, OnDestroy {
  @Output() panStartGesture = new EventEmitter();
  @Output() panGesture = new EventEmitter();
  @Output() panEndGesture = new EventEmitter();

  @Output() tapGesture = new EventEmitter();

  private hammer: HammerManager = undefined;

  constructor(
    private elRef: ElementRef,
    private platform: PlatformService,
  ) {}

  ngAfterViewInit() {
    this.initHammer();
  }

  ngOnDestroy() {
    this.destroyHammer();
  }

  public initHammer() {
    if (!this.hammer && this.platform.isBrowser()) {
      this.hammer = new Hammer(this.elRef.nativeElement);

      // Disabling gestures that are enabled by default, but not used in this directive
      this.hammer.get('doubletap').set({ enable: false });
      this.hammer.get('press').set({ enable: false });
      this.hammer.get('swipe').set({ enable: false });

      this.hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
      this.hammer.on('panstart', (ev) => {
        this.panStartGesture.emit(ev);
      });
      this.hammer.on('pan', (ev) => {
        this.panGesture.emit(ev);
      });
      this.hammer.on('panend', (ev) => {
        this.panEndGesture.emit(ev);
      });

      this.hammer.on('tap', (ev) => {
        this.tapGesture.emit(ev);
      });
    }
  }

  public destroyHammer() {
    if (this.hammer) {
      this.hammer.destroy();
      this.hammer = undefined;
    }
  }

}
