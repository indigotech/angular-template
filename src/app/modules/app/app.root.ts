import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { TransferState } from '@ng-universal/transfer-state';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MenuGesturesDirective, MenuItem, MenuSubItem, DropdownDirective } from 'widgets';

import { NavigationControlService } from 'app/modules/shared/navigation/navigation-control.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  template: require('./app.root.pug'),
})
export class AppRoot implements OnDestroy, OnInit {

  @ViewChild('menu') menu;
  @ViewChild('menuDropdown') menuDropdown: DropdownDirective;

  /**
   * Defines the menu position:
   * When true: LEFT: Menu opens from the left
   * When false: RIGHT: Menu opens from the right
   */
  private menuPositionLeft: boolean = true;

  private menuDropdownArray: MenuItem[] = [
    new MenuItem('Our Work',  [], ''),
    new MenuItem('Services',  [], ''),
    new MenuItem('Digest',    [], ''),
    new MenuItem('Our Story', [], ''),
  ];

  private menuArray: MenuItem[] = [
    new MenuItem('Users'          ,     [], '/user'),
    new MenuItem('Login'          ,     [], '/account/login'),
    new MenuItem('Change password',     [], '/account/edit-password'),
  ];

  private resizeSubscription: Subscription;

  /**
   * Contains if the menu is visible or not
   */
  private isMenuVisible: boolean = false;

  constructor(
    private navCtrlSvc: NavigationControlService,
    private renderer: Renderer,
    private router: Router,
    private platform: PlatformService,
    private transferState: TransferState,
  ) {}

  ngOnInit() {
    console.warn('Initial App State');
    // TODO make this transfer state work in dev-server too
    console.warn(this.transferState.toJson());
    this.addObservable();
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

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

  // Window resize

  // Observables
  private addObservable() {
    if (this.platform.isBrowser()) {
      this.resizeSubscription = Observable.fromEvent(window, 'resize')
        .debounceTime(300)
        .subscribe(event => this.onResize(event));
    }
  }

  private onResize(ev: any) {
    this.closeDropdowns();
  }

  private closeDropdowns() {
    if (this.menuDropdown) {
      this.menuDropdown.close();
    }
  }
}
