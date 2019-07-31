import { Component } from '@angular/core';

import { AnimatedComponent } from 'widgets';

@AnimatedComponent('fadeIn')
@Component({
  selector: 'home',
  template: require('./home.pug'),
})
export class Home {

  constructor() { }

  ngOnInit() {}
}
