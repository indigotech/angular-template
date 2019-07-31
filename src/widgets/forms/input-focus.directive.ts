import { Directive, ElementRef, Input } from '@angular/core';

import { Renderer } from '@tq-angular/render';

@Directive({
  selector: '[tq-input-focus]',
})

export class InputFocusDirective {

  private _focus: boolean = false;

  @Input('tq-input-focus')
  set focus(focus: boolean) {
    if (focus) {
      this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
    }
    this._focus = focus;
  }
  get focus(): boolean {
    return this._focus;
  }

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
  ) {}

}
