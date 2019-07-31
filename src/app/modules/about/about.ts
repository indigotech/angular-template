import {Component} from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.warn('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  styles:   [],
  template: `<h2> This is an asynchronously loaded page (about)</h2>`,
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.warn('hello `About` component');
  }
}
