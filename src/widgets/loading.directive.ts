import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'tq-loading',
  template: require('./loading.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDirective implements OnChanges {


  /**
   * Sets if loading is visible or not.
   */
  @HostBinding ('class.is-loading') loadingClass;

  @Input() isLoading: boolean;

  /**
   * Fired when loading is finished.
   */
  @Output() loadingFinished = new EventEmitter<boolean>();

  @HostBinding ('class.loading') true;

  private loadingTimer: any;

  constructor() {}

  ngOnChanges() {
    this.changeClass();
  }

  public finish() {
    this.isLoading = false;
    this.loadingFinished.emit(true);
    this.changeClass();

  }

  public start() {
    this.isLoading = true;
    this.changeClass();
  }

  private changeClass() {
    if (this.isLoading) {
      this.loadingTimer = Observable.timer(500).subscribe(() => {
        this.loadingClass = true;
      });

    } else {
      if (this.loadingTimer) this.loadingTimer.unsubscribe();
      this.loadingClass = false;
    }

  }
}
