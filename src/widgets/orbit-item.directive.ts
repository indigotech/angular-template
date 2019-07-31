import { Component, ChangeDetectionStrategy, ElementRef, HostBinding, Injectable, OnInit } from '@angular/core';
import { OrbitDirective } from '../widgets';

@Component({
  selector: 'tq-orbit-item',
  template: require('./orbit-item.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

@Injectable()
export class OrbitItemDirective implements OnInit {

  @HostBinding('class.orbit-item') true;

  @HostBinding('class.is-active')
  get active(): boolean {
    return this.orbit.isOrbitItemActive(this);
  }

  private el: HTMLElement;

  constructor(
    private orbit: OrbitDirective,
    el: ElementRef,
  ) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.orbit.addItem(this);
  }

  /**
   * Returns the orbit-item elementRef.
   */
  getOrbitItemElement(): HTMLElement {
    return this.el;
  }

}
