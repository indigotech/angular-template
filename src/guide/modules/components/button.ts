import { Component } from '@angular/core';

@Component({
  selector: 'guide-button',
  template: require('./button.pug'),
})

export class Button {

  private isButtonLoading: boolean = false;

  private onButtonTap() {
    this.isButtonLoading = true;

    setTimeout(() => {
      this.isButtonLoading = false;
    }, 2000);
  }
}
