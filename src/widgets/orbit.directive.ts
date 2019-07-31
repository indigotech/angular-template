import {
  AfterViewInit,
 ChangeDetectionStrategy,
 ChangeDetectorRef,
 Component,
 Directive,
 ElementRef,
 EventEmitter,
 Input,
 Injectable,
 OnDestroy,
 Output,
 ViewChild } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

import { OrbitGesturesDirective, OrbitItemDirective } from './';


let ANIMATION_DURATION = 0.3;
let NO_SWIPE_DELTA = 20;

enum OrbitDirection {
  Left, Right,
}

@Component({
  selector: 'tq-orbit',
  template: require('./orbit.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

@Injectable()
export class OrbitDirective implements AfterViewInit, OnDestroy {

  /**
   * Defines if orbit has left and right arrows. Arrows translate orbit-items with a click.
   * Default mode is false.
   */
  @Input() arrows: boolean = false;

  /**
   * Defines if orbit should autoplay.
   * Default mode is false.
   */
  @Input() autoplay: boolean = false;

  /**
   * Defines the interval of the orbit autoplay.
   * Default mode is 3000ms.
   */
  @Input() interval: number = 3000;

  /**
   * Defines if orbit has an infinite loop.
   * Default mode is false.
   */
  @Input() infinite: boolean = false;

  /**
   * Event: orbit item tapped
   */
  @Output() orbitItemTap = new EventEmitter();

  /**
   * Orbit: contains all the orbit items. It's the div that translates.
   */
  @ViewChild('orbit') orbit;

  public orbitDirectionEnum = OrbitDirection;

  private items: Array<OrbitItemDirective> = [];
  private index: number = 0;
  private animationDuration: number = ANIMATION_DURATION;
  private direction: number;
  private panInitialIndex: number = 0;

  // Autoplay
  private timer: any = undefined;

  constructor(
    private cdRef: ChangeDetectorRef,
    private elRef: ElementRef,
    private renderer: Renderer,
    private platform: PlatformService,
  ) {}

  // Lifecycle

  ngAfterViewInit() {
    this.initialSetup();

    if (this.platform.isBrowser()) {
      if (this.infinite && this.hasMoreThanOneItem()) {
        this.setupInfiniteLoop();
      }

      if (this.autoplay && this.hasMoreThanOneItem()) {
        this.setupInterval();
      }
    }
  }

  ngOnDestroy() {
    this.clearIntervalIfNeeded();
  }

  // Public

  /**
   * Goes to index: It's always animated and stops the autoplay.
   */
  goToIndex(index: number) {
    this.clearIntervalIfNeeded();
    this.setupAnimation();
    this.index = this.infinite ? (index + 1) : index;
    this.cdRef.markForCheck();
  }

  /**
   * Returns the items length.
   */
  itemsLength(): number {
    return this.items.length;
  }

  /**
   * Returns the item index. The first item index is equal to 0.
   */
  currentIndex(): number {
    return this.infinite ? (this.intIndex() - 1) : this.intIndex();
  }

  /**
   * Checks if the orbit item is active or not.
   */
  isOrbitItemActive(item: OrbitItemDirective): boolean {
    return this.isIndexActive(this.items.indexOf(item));
  }

  /**
   * Checks if the index is active or not.
   */
  isIndexActive(itemsArrayIndex: number): boolean {
    const isIndexActive = itemsArrayIndex === this.currentIndex();

    if (this.infinite) {
      const isFirstItemActive = itemsArrayIndex === 0;
      const isLastItemActive = itemsArrayIndex === this.items.length - 1;

      if (isFirstItemActive && isLastItemActive) {
        return true;
      }

      if (isFirstItemActive) {
        const isFalseFirstItemActive = this.index === (this.items.length + 1);
        return isFalseFirstItemActive || isIndexActive;
      } else if (isLastItemActive) {
        const isFalseLastItemActive = this.index === 0;
        return isFalseLastItemActive || isIndexActive;
      }
    }

    return isIndexActive;
  }

  /**
   * Adds orbit items to the orbit items array.
   */
  addItem(item: OrbitItemDirective): void {
    this.items.push(item);
  }

  /**
   * Returns if the autoplay is playing or not.
   */
  autoplayIsPlaying(): boolean {
    return this.timer ? true : false;
  }

  // Private methods

  /**
   * Translates the orbit-item to left/right. It bounces to show the end/start.
   * It's the default action for swipes and arrows.
   */
  private translateTo(direction: OrbitDirection): void {
    this.clearIntervalIfNeeded();

    if (this.hasMoreThanOneItem()) {
      if (this.infinite) {
        this.infiniteGoTo(direction);
      } else {
        if (this.canGoTo(direction)) {
          this.goTo(direction);
        } else {
          this.bounceTo(direction);
        }
      }
    }
  }

  /**
   * It 'finishes' the translation when the pan ends.
   * If the delta is larger than NO_SWIPE_DELTA: Swipes to next/previous slide.
   * If the delta is smaller than NO_SWIPE_DELTA: Stays at current slide.
   */
  private translateIfNeeded(): void {
    const deltaXPercent = this.index * 100 % 100;

    let max = this.items.length;
    this.infinite ? max++ : max--;

    const shouldTranslate = deltaXPercent > NO_SWIPE_DELTA && deltaXPercent < (100 - NO_SWIPE_DELTA);
    if (shouldTranslate) {
      const isDirectionRight = this.direction === OrbitDirection.Right;
      this.index = isDirectionRight ? Math.ceil(this.index) : Math.floor(this.index);
    } else {
      const shouldGoToFloor = deltaXPercent > 0 && deltaXPercent < NO_SWIPE_DELTA;
      const isDirectionRight = this.direction === OrbitDirection.Right;
      this.index = (shouldGoToFloor && isDirectionRight) ? Math.floor(this.index) : Math.ceil(this.index);
    }

    this.index = Math.min(Math.max(this.index, 0), max);
    this.cdRef.markForCheck();

    if (this.infinite) {
      this.infiniteResetTranslation();
    }
  }

  // Infinite loop

  /**
   * Needs to be called after view init because it depends on the orbit items.
   * This method creates the false first and last elements in order to simulate the infinite loop.
   */
  private setupInfiniteLoop() {
    const firstOrbitItem: HTMLElement = this.items[0].getOrbitItemElement();
    const lastOrbitItem: HTMLElement = this.items[this.items.length - 1].getOrbitItemElement();

    const falseFirstOrbitItem = firstOrbitItem.cloneNode(true);
    const falseLastOrbitItem = lastOrbitItem.cloneNode(true);

    this.orbit.nativeElement.insertBefore(falseLastOrbitItem, firstOrbitItem);
    this.orbit.nativeElement.appendChild(falseFirstOrbitItem);

    this.setFalseFirstItemActive(false);
    this.setFalseLastItemActive(false);

    this.index = 1;
    this.cdRef.markForCheck();
  }

  private infiniteGoTo(direction: OrbitDirection): void {
    this.setupAnimation();
    this.goTo(direction);

    this.infiniteResetTranslation();
  }

  /**
   * It resets the orbit-container translation to the start/end, so it doesnt end at a 'false' item.
   */
  private infiniteResetTranslation(): void {
    const timeoutDuration: number = ANIMATION_DURATION * 1000;

    let isFalseFirstItem = this.index === (this.items.length + 1);
    if (isFalseFirstItem) {
      this.setFalseFirstItemActive(true);
      setTimeout(() => {
        this.removeAnimation();
        this.index = 1;
        this.setFalseFirstItemActive(false);
        this.cdRef.markForCheck();
      }, timeoutDuration);
    }

    let isFalseLastItem = this.index === 0;
    if (isFalseLastItem) {
      this.setFalseLastItemActive(true);
      setTimeout(() => {
        this.removeAnimation();
        this.index = this.items.length;
        this.setFalseLastItemActive(false);
        this.cdRef.markForCheck();
      }, timeoutDuration);
    }
  }

  private setFalseFirstItemActive(isActive: boolean) {
    this.renderer.setElementClass(
      this.orbit.nativeElement.lastElementChild,
      'is-active',
      isActive,
    );
  }

  private setFalseLastItemActive(isActive: boolean) {
    this.renderer.setElementClass(
      this.orbit.nativeElement.firstElementChild,
      'is-active',
      isActive,
    );
  }

  // Autoplay

  /**
   * Autoplay: moves to next item. When it's not possible to continue, it changes the direction.
   */
  private moveToNextItem(): void {
    if (this.infinite) {
      this.infiniteGoTo(OrbitDirection.Left);
    } else {
      if (this.direction === OrbitDirection.Left && !this.canGoTo(OrbitDirection.Left)) {
        this.direction = OrbitDirection.Right;
      } else if (this.direction === OrbitDirection.Right && !this.canGoTo(OrbitDirection.Right)) {
        this.direction = OrbitDirection.Left;
      }
      this.goTo(this.direction);
    }
  }

  private setupInterval() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.moveToNextItem();
      }, this.interval);
    }
  }

  private clearIntervalIfNeeded() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  // Arrows

  private shouldShowArrows(): boolean {
    return this.arrows && this.hasMoreThanOneItem();
  }

  private onArrowClick(direction: OrbitDirection): void {
    return this.translateTo(direction);
  }

  // Gestures logic:
  // - pan to change slides: no pan if only one item.
  // - simple tap at the slide

  private doPanStartGesture(ev: any) {
    if (!this.hasMoreThanOneItem()) {
      return;
    }
    this.clearIntervalIfNeeded();

    this.panInitialIndex = this.index;
    this.removeAnimation();
  }

  private doPanGesture(ev: any) {
    if (!this.hasMoreThanOneItem()) {
      return;
    }
    ev.preventDefault();
    this.direction = ev.deltaX < 0 ? OrbitDirection.Right : OrbitDirection.Left;
    const orbitWidth = this.elRef.nativeElement.getBoundingClientRect().width;
    this.index = this.panInitialIndex - (ev.deltaX / orbitWidth);
  }

  private doPanEndGesture(ev: any) {
    if (!this.hasMoreThanOneItem()) {
      return;
    }
    ev.preventDefault();
    this.setupAnimation();
    this.translateIfNeeded();
  }

  private doTapGesture(ev: any): void {
    this.clearIntervalIfNeeded();
    this.orbitItemTap.emit({ ev: ev, index: this.currentIndex() });
  }

  // Items

  private intIndex(): number {
    return Math.round(this.index);
  }

  private hasMoreThanOneItem(): boolean {
    return (this.items.length > 1);
  }

  // Orbit-item translation

  private initialSetup(): void {
    this.index = 0;
    this.direction = OrbitDirection.Right;
  }

  private setTranslationStyles() {
    let translateX = 'translateX(' + this.index * -100 + '%)';

    let styles = {
      'transition'        : 'all ' + this.animationDuration + 's ease-out',
      '-ms-transform'     : translateX,
      '-webkit-transform' : translateX,
      '-moz-transform'    : translateX,
      '-o-transform'      : translateX,
      'transform'         : translateX,
    };
    return styles;
  }

  private canGoTo(direction: OrbitDirection): boolean {
    if (direction === OrbitDirection.Left) {
      return this.index < this.items.length - 1;
    } else {
      return this.index > 0;
    }
  }

  private goTo(direction: OrbitDirection): void {
    if (direction === OrbitDirection.Left) {
      this.index++;
    } else {
      this.index--;
    }
    this.cdRef.markForCheck();
  }

  private bounceTo(direction: OrbitDirection): void {
    let percent = 0.2;
    if (direction === OrbitDirection.Right) {
      percent = - percent;
    }
    this.index = this.index + percent;
    setTimeout(() => {
      this.index = this.intIndex();
      this.cdRef.markForCheck();
    }, 100);
  }

  private removeAnimation() {
    this.animationDuration = 0;
  }

  private setupAnimation() {
    this.animationDuration = ANIMATION_DURATION;
  }

}
