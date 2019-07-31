import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

// ng2-img-fallback by Vadym Yatsyuk
// https://github.com/VadimDez/ng2-img-fallback
@Directive({
  selector: '[img-src-fallback]',
})
export class ImageFallbackDirective implements OnDestroy {

  @Input('img-src-fallback') imgSrc: string;

  private el: HTMLImageElement;
  private isApplied: boolean = false;
  private EVENT_TYPE = 'error';

  constructor(
    el: ElementRef,
    private renderer: Renderer,
    private platform: PlatformService,
  ) {
    this.el = el.nativeElement;
    if (this.platform.isBrowser()) {
      this.el.addEventListener(this.EVENT_TYPE, this.onError.bind(this));
    }
  }

  ngOnDestroy() {
    this.removeEvents();
  }

  private onError() {
    this.removeEvents();

    if (!this.isApplied) {
      this.isApplied = true;
      if (this.imgSrc) {
        this.renderer.setElementAttribute(
          this.el,
          'src',
          this.imgSrc,
        );
      } else {
        this.renderer.setElementStyle(
          this.el,
          'display',
          'none',
        );
      }
    }
  }

  private removeEvents() {
    if (this.platform.isBrowser()) {
      this.el.removeEventListener(this.EVENT_TYPE, this.onError);
    }
  }

}
