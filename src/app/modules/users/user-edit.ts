import { AnimatedComponent } from 'widgets';
import { BaseComponent } from 'app/core';
import { Component } from '@angular/core';
import { NotificationService } from 'app/modules/shared/notification';

@AnimatedComponent('fadeIn')
@Component({
  selector: 'user-edit',
  template: require('./user-edit.pug'),
})

export class UserEdit extends BaseComponent {
  constructor(
    notification: NotificationService,
  ) { super(notification); }
}
