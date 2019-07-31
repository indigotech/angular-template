
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ClipboardService {

  constructor(@Inject(DOCUMENT) private document) { }

  copyToClipboard(elemName) {
    let elem: any = this.document.getElementById(elemName);
    try {
      elem.classList = 'visible';
      elem.select();
      this.document.execCommand('copy');
    } catch (err) {
      console.error(err);
    } finally {
      elem.classList = 'hidden';
    }
  }

}
