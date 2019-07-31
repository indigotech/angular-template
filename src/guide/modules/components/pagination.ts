import { Component } from '@angular/core';

@Component({
  selector: 'guide-pagination',
  template: require('./pagination.pug'),
})

export class Pagination {

  private onPageTap(ev: any) {
    console.warn('Page tapped ', ev);
  }
}
