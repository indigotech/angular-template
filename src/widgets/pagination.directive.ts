import * as _ from 'custom-lodash';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'tq-pagination',
  template: require('./pagination.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationDirective implements OnChanges {

  /**
   * Defines the number of pages before (and after) the current page to be shown in the pagination
   * Default is 2
   */
  @Input() range: number = 2;

  /**
   * Defines the current page of the pagination
   * Starting at 1
   */
  @Input() currentPage: number = 1;

  /**
   * Defines the total number of pages
   */
  @Input() totalPages: number = 1;

  /**
   * Defines the Previous label
   */
  @Input() previousLabel: string = 'Previous';

  /**
   * Defines the 'of' connector in the mobile pagination. As in {{currentPage}} <ofConnector> {{totalPages}}.
   * Default is 'of' (english)
   */
  @Input() ofConnector: string = 'of';

  /**
   * Defines the Next label
   */
  @Input() nextLabel: string = 'Next';

  /**
   * Fired when a page is tapped
   * Output: Index of page
   */
  @Output() pageTap = new EventEmitter<number>();

  private pages = [];
  private firstPageText = '1';
  private middleText = '...';

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnChanges() {
    this.getPagesArray();
    this.cdRef.detectChanges();
  }

  getPagesArray() {
    this.pages = [];

    let index = this.currentPage - this.range;
    if (this.currentPage > (this.totalPages - this.range)) index = this.totalPages - this.range * 2;
    if (index < 1) index = 1;

    let i = 0, final = this.range * 2 + 1;
    for (; (i < final) && (index <= this.totalPages); ++i, ++index) {
      this.pages.push(index);
    }

    this.cdRef.markForCheck();
  }

  showFirst(): boolean {
    if (!_.isEmpty(this.pages)) {
      return this.pages[0] !== 1;
    }
    return false;
  }

  showFirstEllipsis(): boolean {
    if (!_.isEmpty(this.pages)) {
      return (this.pages[0] !== 1 && this.pages[0] !== 2 );
    }
    return false;
  }

  showLast(): boolean {
    if (!_.isEmpty(this.pages)) {
      return this.pages[this.pages.length - 1] !== this.totalPages;
    }
    return false;
  }

  showLastEllipsis(): boolean {
    if (!_.isEmpty(this.pages)) {
      return this.pages[this.pages.length - 1] !== this.totalPages &&
              this.pages[this.pages.length - 1] !== this.totalPages - 1;
    }
    return false;
  }

  showPrevious(): boolean {
    return this.currentPage !== 1;
  }

  showNext(): boolean {
    return this.currentPage !== this.totalPages;
  }

  onPageButtonTap(index: number) {
    if (this.currentPage !== index) {
      this.currentPage = index;
      this.pageTap.emit(this.currentPage);
      this.getPagesArray();
    }
  }

}
