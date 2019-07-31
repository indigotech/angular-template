import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector:      'app',
  encapsulation: ViewEncapsulation.None,
  styles:        [
    require('../../../assets/css/index.styl'),
  ],
  template: '<router-outlet></router-outlet>',
})
export class App {}
