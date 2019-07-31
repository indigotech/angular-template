import { Component } from '@angular/core';

@Component({
  selector: 'guide-accordion',
  template: require('./accordion.pug'),
})

export class Accordion {

  private oneItemAtATime: boolean = true;

  constructor() {}
}
