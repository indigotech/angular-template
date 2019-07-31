import { AfterViewInit, Component, Injectable, Input } from '@angular/core';
import { OrbitDirective } from '../widgets';

@Component({
  selector: 'tq-orbit-control',
  template: require('./orbit-control.directive.pug'),
})

@Injectable()
export class OrbitControlDirective implements AfterViewInit {

  /**
   * Defines the items array. Recommended: up to 5 items.
   * When not set, it'll get the same number of items from the orbit (used for the page control).
   */
  @Input('thumbnailItems')
  set items(v: any[]) {
    this._items = v;
    this.hasMoreThanOneItem = v.length > 1;
  }
  get items(): any[] {
    return this._items;
  }

  /**
   * Defines if orbit has thumbnails. Default mode is false.
   */
  @Input() thumbnail: boolean = false;

  /**
   * Defines if orbit has page control. Default mode is true.
   */
  @Input() pageControl: boolean = true;

  private interval: number;
  private _items: any[];
  private hasMoreThanOneItem: boolean = false;

  constructor(
    private orbit: OrbitDirective,
  ) {}

  ngAfterViewInit() {
    if (!this.items) {
      this.items = new Array(this.orbit.itemsLength());
    }
    this.interval = (this.orbit.interval / 1000);
  }

  // Thumbnail

  private shouldShowThumbnails(): boolean {
    return this.hasMoreThanOneItem && this.thumbnail;
  }

  private onThumbnailClick(index: number) {
    this.orbit.goToIndex(index);
  }

  // Page control

  private shouldShowPageControl(): boolean {
    return this.hasMoreThanOneItem && this.pageControl;
  }

  private onControlItemTap(index: number) {
    this.orbit.goToIndex(index);
  }

  // Active item

  private isIndexActive(index: number): boolean {
    return this.orbit.isIndexActive(index);
  }

  private setPreviewStyle(index: number) {
    const shouldAnimate = this.orbit.autoplayIsPlaying() && this.isIndexActive(index);
    const animation = shouldAnimate ? this.interval : 0;
    let styles = {
      'transition': 'all ' + animation + 's linear',
    };
    return styles;
  }

}
