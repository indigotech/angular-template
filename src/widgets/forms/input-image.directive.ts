import { ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild } from '@angular/core';

import { PlatformService } from '@tq-angular/platform';

@Component({
  selector: 'tq-input-image',
  template: require('./input-image.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputImageDirective implements OnDestroy {

  private _placeholder: string = '';
  private _imageUrl: string = '';
  private _fileName: string = '';
  private inputValue: string = '';
  private alreadyUploaded: boolean = false;

  private doImageVerification: boolean = false;
  public valid: boolean = true;
  public empty: boolean = true;

  private fileReader: FileReader = new FileReader();
  private LOAD_EVENT_TYPE = 'load';

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
    * Optional. Defines the comments of the input
    */
  @Input('comments') comments: string = '';

  /**
    * Defines if the image is required
    */
  @Input('required') required: boolean = true;

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
  set imageUrl(value: string) {
    if (value) {
      this._imageUrl = value;
      this.inputValue = value;
      this.empty = false;
      this.alreadyUploaded = true;
      this.doImageVerification = false;
      this.cdRef.markForCheck();
    }
  }
  get imageUrl(): string {
    return this._imageUrl;
  }

  @Output() onInputDownloadTap = new EventEmitter();
  @Output() onInputDownloadRemoveTap = new EventEmitter();

  @ViewChild('field') field;

  constructor(
    private cdRef: ChangeDetectorRef,
    private platform: PlatformService,
  ) {
    this.inputValue = this.placeholder;
  }

  ngOnInit() {
    if (this.required) {
      this.doImageVerification = true;
      this.cdRef.markForCheck();
    }
    this.setPlaceholder();
  }

  ngOnDestroy() {
    this.removeEvents();
  }

  set fileName(value: string) {
    this._fileName = value;
    this.inputValue = value;
    this.empty = false;
  }
  get fileName(): string {
    return this._fileName;
  }

  // Public

  public getFile(): any {
    if (!this.empty) {
      let imageFile = this.field.nativeElement.files;
      if (imageFile.length !== 0) {
        return imageFile[0];
      }
      return this.imageUrl;
    }
    return '';
  }

  // Private

  onChangeListener(ev: any): void {
    this.doImageVerification = true;
    this.cdRef.markForCheck();
    let str = this.getFileName(ev.target);
    if (this.extensionValid(str) && str.length > 0) {
      this.updateFileName(str);

      if (this.platform.isBrowser) {
        this.fileReader.addEventListener(this.LOAD_EVENT_TYPE, this.onReaderLoad.bind(this));
        this.fileReader.readAsDataURL(ev.target.files[0]);
      }

    } else {
      this.setPlaceholder();
    }

  }

  private onReaderLoad(e: any) {
    let src = e.target.result;
    this._imageUrl = src;
    this.cdRef.markForCheck();
  }

  private removeEvents() {
    if (this.platform.isBrowser) {
      this.fileReader.removeEventListener(this.LOAD_EVENT_TYPE, this.onReaderLoad);
    }
  }

  // Taps

  private onEraseTap(ev: any) {
    if (this.required) {
      this.doImageVerification = true;
      this.cdRef.markForCheck();
    } else {
      this.doImageVerification = false;
      this.cdRef.markForCheck();
    }
    this.field.nativeElement.value = '';
    if (this.alreadyUploaded) {
      this.onInputDownloadRemoveTap.emit(this.field);
    }
    this.setPlaceholder();
  }

  private onDownloadTap(ev: any) {
    this.onInputDownloadTap.emit(this.field);
  }

  // Input file
  private extensionValid(value: string): boolean {
    const validFormats = ['jpg', 'png'];
    let ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
    this.valid = validFormats.indexOf(ext) !== -1;
    return this.valid;
  }

  private setPlaceholder() {
    this.inputValue = this.placeholder;
    this._fileName = '';
    this.empty = true;
    this._imageUrl = '/assets/img/img-placeholder.png';
    this.alreadyUploaded = false;
  }

  private updateFileName(str: any) {
    this.fileName = str;
  }

  private getFileName(target: any): string {
    let str = target.value;
    return str ? str.split( '\\' ).pop() : '';
  }

  public verifyImage(): boolean {
    return (this.doImageVerification);
  }

}
