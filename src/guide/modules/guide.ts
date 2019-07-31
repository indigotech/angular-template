import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuGesturesDirective, MenuItem, MenuSubItem } from 'widgets';

import { Renderer } from '@tq-angular/render';

/*
 * Guide Component
 * Top Level Component
 */
@Component({
  selector:         'guide',
  encapsulation:    ViewEncapsulation.None,
  styles:           [
    require('../../assets/css/index.styl'),
    require('./guide.styl'),
  ],
  template: require('./guide.pug'),
})


export class Guide implements OnInit {

  @ViewChild('menu') menu;

  /**
   * Defines the menu position:
   * When true: LEFT: Menu opens from the left
   * When false: RIGHT: Menu opens from the right
   */
  private menuPositionLeft: boolean = false;

  private menuArray: MenuItem[] = [
    new MenuItem('Structure',
    [
      new MenuSubItem('Important links',   'links',        'fa-link'),
      new MenuSubItem('Colors',            'color',        'fa-paint-brush'),
      new MenuSubItem('Container',         'container',    'fa-dropbox'),
      new MenuSubItem('Grid',              'grid',         'fa-th'),
      new MenuSubItem('Icons',             'icon',         'fa-diamond'),
      new MenuSubItem('Typography',        'typography',   'fa-font'),
    ], ''),
    new MenuItem('Components',
    [
      new MenuSubItem('Custom',            'custom',       'fa-asterisk'),
      new MenuSubItem('Accordion',         'accordion',    'fa-chevron-down'),
      new MenuSubItem('Badge',             'badge',        'fa-certificate'),
      new MenuSubItem('Button',            'button',       'fa-flash'),
      new MenuSubItem('Carousel - Scroll', 'carousel',     'fa-image'),
      new MenuSubItem('Carousel - Orbit',  'orbit',        'fa-image'),
      new MenuSubItem('Chart',             'chart',        'fa-bar-chart'),
      new MenuSubItem('Dropdown',          'dropdown',     'fa-chevron-down'),
      new MenuSubItem('Forms',             'form',         'fa-i-cursor'),
      new MenuSubItem('Lists',             'list',         'fa-list'),
      new MenuSubItem('Loading',           'loading',      'fa-spinner fa-pulse'),
      new MenuSubItem('Notification',      'notification', 'fa-bullhorn'),
      new MenuSubItem('Pagination',        'pagination',   'fa-files-o'),
      new MenuSubItem('Placeholder',       'placeholder',  'fa-object-group'),
      new MenuSubItem('Rating / Review',   'rating',       'fa-star'),
      new MenuSubItem('SVG animation',     'svganimation', 'fa-magic'),
      new MenuSubItem('Tabs',              'tab',          'fa-folder'),
      new MenuSubItem('Toggle Switch',     'toggle-switch', 'fa-toggle-on'),
      new MenuSubItem('Other components',  'other',        'fa-ellipsis-h'),
      new MenuSubItem('404 error',         'fourOFour',    'fa-warning'),
    ], ''),
    new MenuItem('Samples',
    [
      new MenuSubItem('Forms',             'sample/form',   'fa-wpforms'),
      new MenuSubItem('Filter',            'sample/filter', 'fa-filter'),
      new MenuSubItem('Search',            'sample/search', 'fa-search'),
    ], ''),
  ];


  /**
   * Contains if the menu is visible or not
   */
  private isMenuVisible: boolean = false;


  constructor(private renderer: Renderer) {}

  ngOnInit() {}


  private toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
    if (!this.isMenuVisible) {
      this.menu.nativeElement.scrollTop = 0;
    }

    let overflow = this.isMenuVisible ? 'visible' : 'scroll';

    // It is not recommended to access parent elements in the DOM
    // But this is a much simpler way to prevent scroll in the content
    this.renderer.setElementStyle(
      document.querySelector('body'),
      'overflow-y',
      overflow,
    );

    // iOS fix: overflow hidden at body was not enough
    this.renderer.setElementClass(
      document.querySelector('body'),
      'no-scroll',
      this.isMenuVisible,
    );
  }

  // On item click: toggle menu
  private onItemClick(): void {
    if (this.isMenuVisible) {
      this.toggleMenu();
    }
  }

  // Swipe: toggle menu
  private doSwipe(ev: any): void {
    if (this.menuPositionLeft) {
      if ((ev.dir === 'left' && this.isMenuVisible) ||
      (ev.dir === 'right' && !this.isMenuVisible)) {
        this.toggleMenu();
      }
    } else {
      if ((ev.dir === 'left' && !this.isMenuVisible) ||
      (ev.dir === 'right' && this.isMenuVisible)) {
        this.toggleMenu();
      }
    }
  }
}
