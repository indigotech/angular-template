import { Component } from '@angular/core';

import { BaseComponent } from 'app/core';
import { NotificationService } from 'app/modules/shared/notification';

import { AnimatedComponent } from 'widgets';

@AnimatedComponent('fadeIn')
@Component({
  selector: 'user-new',
  template: require('./user-new.pug'),
})

export class UserNew extends BaseComponent {
  constructor(
    notification: NotificationService,
  ) { super(notification); }
}
