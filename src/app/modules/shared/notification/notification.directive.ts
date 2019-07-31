import { Component, OnInit, Input } from '@angular/core';
import { NotificationParams, NotificationService } from 'app/modules/shared/notification/notification.service';

@Component({
  selector: 'tq-notification',
  template: require('./notification.pug'),
})

export class NotificationDirective  {
  @Input() name: string;
  @Input() isDimissible: boolean = true;

  private notification: NotificationParams = {
    name      : this.name,
    msg       : '',
    type      : 'info',
    persistent: false,
  };

  constructor( private notificationService: NotificationService ) {}

  ngOnInit() {
    this.notificationService.params$.subscribe( notificationMsg => {
      if (this.name === notificationMsg.name) {
        this.notification = notificationMsg;
      }
    });
  }
}
