import { Directive, Input, AfterViewInit } from '@angular/core';

import { NavigationControlService } from './navigation-control.service';

@Directive({
  selector: 'navigation-control',
})

export class NavigationControlDirective implements AfterViewInit {

  @Input('isShown') isShown: boolean;

  constructor(
    private navigationControlService: NavigationControlService,
  ) {}

  ngAfterViewInit() {
    this.navigationControlService.isShown = this.isShown;
  }
}
