import { AfterViewInit, Component, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';

@Directive({
  selector: '[img-zoom-gestures]',
})

export class ImageZoomGesturesDirective implements AfterViewInit {

  @Output() panStartGesture = new EventEmitter();
  @Output() panGesture = new EventEmitter();
  @Output() panEndGesture = new EventEmitter();
  @Output() pinchStartGesture = new EventEmitter();
  @Output() pinchGesture = new EventEmitter();
  @Output() pinchEndGesture = new EventEmitter();
  @Output() doubleTapGesture = new EventEmitter();

  private hammer: HammerManager = undefined;

  constructor(
    private el: ElementRef,
    private platform: PlatformService,
  ) {}

  ngAfterViewInit() {
    if (!this.hammer && this.platform.isBrowser()) {
      this.hammer = new Hammer(this.el.nativeElement, { touchAction: 'pan-x pan-y' });


      // Disabling gestures that are enabled by default, but not used in this directive
      this.hammer.get('tap').set({ enable: false });
      this.hammer.get('press').set({ enable: false });
      this.hammer.get('swipe').set({ enable: false });


      this.hammer.get('pan').set({ enable: true, direction: Hammer.DIRECTION_ALL });
      this.hammer.on('panstart', (ev) => {
        this.panStartGesture.emit(ev);
      });
      this.hammer.on('pan', (ev) => {
        this.panGesture.emit(ev);
      });
      this.hammer.on('panend', (ev) => {
        this.panEndGesture.emit(ev);
      });

      this.hammer.get('pinch').set({ enable: true, direction: Hammer.DIRECTION_ALL });
      this.hammer.on('pinchstart', (ev) => {
        this.pinchStartGesture.emit(ev);
      });
      this.hammer.on('pinch', (ev) => {
        this.pinchGesture.emit(ev);
      });
      this.hammer.on('pinchend', (ev) => {
        this.pinchEndGesture.emit(ev);
      });

      this.hammer.get('doubletap').set({ interval: 600 });
      this.hammer.on('doubletap', (ev) => {
        this.doubleTapGesture.emit(ev);
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

@Component({
  selector: 'tq-img-zoom',
  template: require('./image-zoom.directive.pug'),
})

export class ImageZoomDirective {


  /**
   * Image source
   */
  @Input() imgSrc: string;

  private posX:          number;
  private posY:          number;
  private scale:         number;

  private lastPosX:      number;
  private lastPosY:      number;
  private lastScale:     number;
  private lastScrollTop: number;

  private isPinch:       boolean;

  private centerX:       number;
  private centerY:       number;

  constructor() {
    this.initialSetup();
  }

  /*
   * Gesture logic:
   * - Double tap: scales to 2 / goes back to 1.
   * - Pan: when scaled, moves the img.
   * - Pinch: zooms in / out.
   */

  doDoubleTapGesture(ev: any) {
    let el = ev.target;

    if (this.scale > 1.03) {
      this.resetTransformParameters();
    } else {
      this.saveGestureCenter(ev);
      this.scale = 2;
      this.updatePositionAfterScaleEvent(ev);
    }
    this.performTransform(el, true);
    this.saveTransformStatus();
  }

  doPanStartGesture(ev: any) {
    this.lastScrollTop = document.querySelector('body').scrollTop;
  }

  doPanGesture(ev: any) {
    if (!this.isPinch) {
      let el = ev.target;

      if (this.scale > 1) {
        this.posX = this.lastPosX + ev.deltaX;
        this.posY = this.lastPosY + ev.deltaY;
        this.constrainPositions(el.clientWidth, el.clientHeight);
        this.performTransform(el);
      } else {
        // Should scroll
        // iOS Safari: it should be smoother
        const posY = this.lastScrollTop - ev.deltaY;
        window.scrollTo(0, posY);
      }
    }
  }

  doPanEndGesture(ev: any) {
    this.saveTransformStatus();
  }

  doPinchStartGesture(ev: any) {
    this.saveGestureCenter(ev);
    this.isPinch = true;
  }

  doPinchGesture(ev: any) {
    let el = ev.target;

    this.scale = Math.max(.999, Math.min(this.lastScale * (ev.scale), 4));
    this.updatePositionAfterScaleEvent(ev);
    this.performTransform(el);
  }

  doPinchEndGesture(ev: any) {
    this.saveTransformStatus();
    setTimeout(() => {
      this.isPinch = false;
    }, 100);
  }

  /**
   * Private methods
   */

  private initialSetup() {
    this.resetTransformParameters();
    this.saveTransformStatus();

    this.isPinch = false;
  }

  private resetTransformParameters() {
    this.centerX = 0;
    this.centerY = 0;
    this.posX    = 0;
    this.posY    = 0;
    this.scale   = 1;
  }

  private saveTransformStatus() {
    this.lastScale = this.scale;
    this.lastPosX  = this.posX;
    this.lastPosY  = this.posY;
  }

  private getTranformString(): string {
    return 'translate3d(' + this.posX + 'px,' + this.posY + 'px, 0) ' + 'scale3d(' + this.scale + ', ' + this.scale + ', 1)';
  }

  private saveGestureCenter(ev: any) {
    let el = ev.target;
    let elToViewport = el.getBoundingClientRect();

    // Translating the eventCenterToViewport to eventCenterToEl
    this.centerX = ev.center.x - elToViewport.left;
    this.centerY = ev.center.y - elToViewport.top;

    // Fixing scaled center - specially to pinch out.
    if (this.scale > 1.03) {
      this.centerX = this.centerX / this.scale;
      this.centerY = this.centerY / this.scale;
    }

  }

  // The formulas of this method come from this video: http://yuiblog.com/blog/2012/02/23/video-stephen-woods-html5-touch/
  private updatePositionAfterScaleEvent(ev: any) {
    let el = ev.target;

    let crtPointerPosX = (this.centerX - el.offsetWidth / 2) - this.lastPosX;
    let crtPointerPosY = (this.centerY - el.offsetHeight / 2) - this.lastPosY;

    let finalPointerPosX = crtPointerPosX * ((this.lastScale - this.scale) / this.lastScale);
    let finalPointerPosY = crtPointerPosY * ((this.lastScale - this.scale) / this.lastScale);

    this.posX = this.lastPosX + finalPointerPosX;
    this.posY = this.lastPosY + finalPointerPosY;

    this.constrainPositions(el.clientWidth, el.clientHeight);
  }

  private constrainPositions(elementWidth: number, elementHeight: number) {
    let maxPosX = Math.ceil((this.scale - 1) * elementWidth / 2);
    let maxPosY = Math.ceil((this.scale - 1) * elementHeight / 2);

    if (this.posX > maxPosX) {
      this.posX = maxPosX;
    }
    if (this.posX < -maxPosX) {
      this.posX = -maxPosX;
    }
    if (this.posY > maxPosY) {
      this.posY = maxPosY;
    }
    if (this.posY < -maxPosY) {
      this.posY = -maxPosY;
    }
  }

  private performTransform(el: any, animated: boolean = false) {
    el.style.transition = animated ? '0.3s all ease-in-out' : '';
    el.style.transform  = this.getTranformString();
  }

}
