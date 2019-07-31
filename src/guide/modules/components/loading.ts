import { Component, ViewChild } from '@angular/core';

import { LoadingDirective } from 'widgets';

@Component({
  selector: 'guide-loading',
  template: require('./loading.pug'),
})

export class Loading {

  isLoading: boolean = false;
  isCellLoading: boolean = false;

  startLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  startCellLoading() {
    this.isCellLoading = true;
    setTimeout(() => {
      this.isCellLoading = false;
    }, 3000);
  }

}
