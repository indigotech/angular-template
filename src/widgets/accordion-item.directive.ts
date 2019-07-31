import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

import { AccordionDirective } from './';

@Component({
  selector: 'tq-accordion-item',
  template: require('./accordion-item.directive.pug'),
})
export class AccordionItemDirective implements AfterViewInit, OnDestroy {

  @ViewChild('accordionItem') accordionItem;

  /**
   * AccordionItemBodyContainer sets the max-height of the body
   * in order to open/close the accordion-item.
   */
  @ViewChild('accordionItemBodyContainer') accordionItemBodyContainer;

  @ViewChild('accordionItemFooterContainer') accordionItemFooterContainer;

  /**
   * We get the body height from AccordionItemBody.
   */
  @ViewChild('accordionItemBody') accordionItemBody;

  /**
   * Shows if accordion-item is open or not.
   **/
  @HostBinding('class.accordion-item-is-open')
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  /**
   * Sets the minimal height for the closed state.
   **/
  @Input() minHeight: string = '0';

  /**
   * Sets if the accordion should scroll to top when the footer is tapped.
   **/
  @Input() scrollTopOnFooterTap: boolean = false;

  private isOverflowVisible: boolean = false;

  private subtreeModifiedObservable : Subscription;
  private resizeObservable          : Subscription;

  public constructor(
    private renderer: Renderer,
    private accordion: AccordionDirective,
    private platformService: PlatformService,
  ) {}

  ngAfterViewInit() {
    this.accordion.addItem(this);

    if (this.platformService.isBrowser()) {
      if ( !this.isOpen ) {
        this.collapse();
      } else {
        this.expand();
      }

      this.subtreeModifiedObservable = Observable.fromEvent(this.accordionItemBodyContainer.nativeElement, 'DOMSubtreeModified')
        .debounceTime(20)
        .subscribe(() => {
          this.onResize();
        });

      this.resizeObservable = Observable.fromEvent(window, 'resize')
        .debounceTime(200)
        .subscribe(() => {
          this.onResize();
        });

    }
  }

  ngOnDestroy() {
    this.subtreeModifiedObservable.unsubscribe();
    this.resizeObservable.unsubscribe();
  }

  public toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);

    if ( this.isOpen ) {
      this.accordion.closeOtherItems(this);
      this.expand();
    } else {
      this.collapse();
    }
  }

  private onFooterTap() {
    this.toggleOpen();
    if ( !this.isOpen && this.scrollTopOnFooterTap ) {
      window.scrollTo(0, this.elYPosition(this.accordionItem.nativeElement));
    }
  }

  private onResize() {
    let display: string = 'block';

    if ( parseInt(this.minHeight.substring(this.minHeight.length - 1), 10) >=
         this.accordionItemBody.nativeElement.offsetHeight ) {
           display = 'none';
    }

    this.renderer.setElementStyle(
      this.accordionItemFooterContainer.nativeElement,
      'display',
      display,
    );

    // Recalculates the size when onResize.
    if ( this.isOpen ) {
      this.expand();
    }

  }

  private expand() {

    if (this.platformService.isBrowser()) {
      setTimeout(() => {
        if (this.isOpen) {
          this.isOverflowVisible = true;
        }
      }, 400);
    }

    this.renderer.setElementStyle(
      this.accordionItemBodyContainer.nativeElement,
      'maxHeight',
      this.accordionItemBody.nativeElement.offsetHeight +
      this.accordionItemFooterContainer.nativeElement.offsetHeight + 'px',
    );

    if ( this.accordionItemFooterContainer.nativeElement.offsetHeight  > 0) {
      this.renderer.setElementStyle(
        this.accordionItemBodyContainer.nativeElement,
        'paddingBottom',
        this.accordionItemFooterContainer.nativeElement.offsetHeight + 'px',
      );
    }
  }

  private collapse() {
    this.isOverflowVisible = false;

    this.renderer.setElementStyle(
      this.accordionItemBodyContainer.nativeElement,
      'maxHeight',
      this.minHeight,
    );
  }

  private elYPosition(el: HTMLElement): number {
    let y = el.offsetTop;

    while (el.offsetParent && el.offsetParent !== document.body) {
      el = <HTMLElement>el.offsetParent;
      y += el.offsetTop;
    } return y;
  }

}
