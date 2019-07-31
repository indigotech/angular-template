import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'tq-button-loading',
  template: require('./button-loading.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLoadingDirective implements OnChanges {

  /**
   * Defines the classes to style the button.
   * The classes must be separated by spaces.
   */
  @Input() classes: string;

  /**
   * Defines if button is loading. When button is loading, the spinner is shown and button is disabled.
   */
  @Input() isLoading = false;

  /**
   * Input to disable this button.
   * This flag SHOULD NOT be used to determine if this button is disabled. Instead, isDisabled() method should be used.
   */
  @Input() disabled = false;

  ngOnChanges(changes: SimpleChanges) {
    this.classes = this.isDisabled() ? this.classes.concat(' disabled ') : this.classes.replace('disabled', '');
  }

  onClick(clickEvent: MouseEvent) {
    if (this.isDisabled()) {
      clickEvent.stopPropagation();
    }
  }

  private isDisabled() {
    return this.isLoading || this.disabled;
  }

}
