import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[tqTransclude]',
})
export class TranscludeDirective {
  public viewRef: ViewContainerRef;
  private _tqTransclude: TemplateRef<any>;

  @Input()
  private set tqTransclude(templateRef: TemplateRef<any>) {
    this._tqTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  private get tqTransclude(): TemplateRef<any> {
    return this._tqTransclude;
  }

  public constructor(private _viewRef: ViewContainerRef) {
    this.viewRef = _viewRef;
  }
}
