import { Component } from '@angular/core';

@Component({
  selector: 'guide-orbit',
  template: require('./orbit.pug'),
})

export class Orbit {
  imgArray = [
    'http://placehold.it/600x280/',
    'http://placehold.it/601x281/',
    'http://placehold.it/602x282/',
  ];

  onOrbitItemTap(ev: any): void {
    alert('Orbit item at index ' + ev.index + ' tapped!');
  }

  onButtonTapped(ev: any): void {
    alert('Button clicked!');
  }
}
