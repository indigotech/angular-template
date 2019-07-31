import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'tq-input-file',
  template: require('./input-file.directive.pug'),
})

export class InputFileDirective {

  private _placeholder:   string = '';
  private _downloadName:  string = '';
  private _fileName:      string = '';
  private inputValue:     string = '';
  private canDownload:    boolean = false;
  private hasFile:        boolean = false;

  /**
    * Defines the label of the input.
    * It's equal to 'text' if it has a mask.
    */
  @Input() label: string = 'Arquivo';

  /**
    * Defines the id of the input
    */
  @Input('inputId') id: string;

  /**
    * Optional. Defines the placeholder of the input
    */
  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.inputValue = value;
  }
  get placeholder(): string {
    return this._placeholder;
  }

  /**
    * Defines if the input should download instead of upload
    */
  @Input()
  set downloadName(value: string) {
    this._downloadName = value;
    this.inputValue = value;
    this.canDownload = true;
  }
  get downloadName(): string {
    return this._downloadName;
  }

  set fileName(value: string) {
    this._fileName = value;
    this.inputValue = value;
    this.hasFile = true;
  }
  get fileName(): string {
    return this._fileName;
  }


  @Output() onInputDownloadTap = new EventEmitter();
  @Output() onInputDownloadRemoveTap = new EventEmitter();

  @ViewChild('field') field;

  constructor() {
    this.inputValue = this.placeholder;
  }

  public getFiles(): any {
    return this.field.nativeElement.files;
  }

  onChangeListener(ev: any): void {
    this.updateFileName(ev.target);
  }

  onEraseTap(ev: any) {
    this.field.nativeElement.value = '';
    if (this.canDownload) {
      this.onInputDownloadRemoveTap.emit(this.field);
    }
    this.setPlaceholder();
  }

  onDownloadTap(ev: any) {
    this.onInputDownloadTap.emit(this.field);
  }

  private setPlaceholder() {
    this.inputValue = this.placeholder;
    this._fileName = '';
    this.hasFile = false;
    this._downloadName = '';
    this.canDownload = false;
  }

  private updateFileName(target: any) {
    let str = this.getFileName(target);
    if (str.length > 0) {
      this.fileName = str;
    } else {
      this.setPlaceholder();
    }
  }

  private getFileName(target: any): string {
    let str = target.value;
    return str ? str.split( '\\' ).pop() : '';
  }

}
