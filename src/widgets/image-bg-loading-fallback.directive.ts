import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

// ng2-img-fallback by Vadym Yatsyuk
// https://github.com/VadimDez/ng2-img-fallback

@Directive({
  selector: '[img-bg-loading-fallback]',
})
export class ImageBgLoadingFallbackDirective implements AfterViewInit, OnDestroy {

  @Input('img-bg-loading-fallback') fallbackSrc: string;

  private el: HTMLImageElement;
  private isApplied: boolean = false;
  private ERROR_EVENT_TYPE = 'error';
  private LOAD_EVENT_TYPE = 'load';

  constructor(
    el: ElementRef,
    private renderer: Renderer,
    private platform: PlatformService,
  ) {
    this.el = el.nativeElement;
    if (this.platform.isBrowser()) {
      this.el.addEventListener(this.ERROR_EVENT_TYPE, this.onError.bind(this));
      this.el.addEventListener(this.LOAD_EVENT_TYPE, this.onLoad.bind(this));
    }
  }

  ngAfterViewInit() {
    if (this.platform.isBrowser()) {
      this.configLoading();
    }
  }

  ngOnDestroy() {
    this.removeEvents();
  }

  private onError() {
    this.removeEvents();

    if (!this.isApplied) {
      this.isApplied = true;
      this.removeSrc();
    }
  }

  private onLoad() {
    this.removeEvents();

    if (!this.isApplied) {
      this.isApplied = true;
      this.configImgBg();
    }
  }

  private configImgBg() {
    let url = 'url(' + this.el.src + ')';
    this.renderer.setElementStyle(
      this.el,
      'background-image',
      url,
    );
    this.removeSrc();
  }

  private configLoading() {
    let url = 'url(' + this.fallbackSrc + ')';
    this.renderer.setElementStyle(
      this.el,
      'background-image',
      url,
    );

  }

  private removeSrc() {
    this.renderer.setElementAttribute(
      this.el,
      'src',
      '/assets/img/img-transparent.png',
    );
  }

  private removeEvents() {
    if (this.platform.isBrowser()) {
      this.el.removeEventListener(this.ERROR_EVENT_TYPE, this.onError);
      this.el.removeEventListener(this.LOAD_EVENT_TYPE, this.onLoad);
    }
  }
}
