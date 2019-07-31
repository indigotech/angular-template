import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import {
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';

export type NotificationType = 'error' | 'success' | 'warning' | 'info';

export interface NotificationParams {
  name      : string;
  msg       : string;
  type      : string;
  persistent: boolean;
}

@Injectable()
export class NotificationService {
  private notificationList: any = {};

  private params: NotificationParams = {
    name      : '',
    msg       : '',
    type      : 'info',
    persistent: false,
  };

  private _params = new Subject<NotificationParams>();
  params$ = this._params.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((value: any) => {
      if (value instanceof NavigationEnd) {

        let names = Object.keys(this.notificationList);

        for (let name of names) {
          this._params.next(this.notificationList[name]);
          delete this.notificationList[name];
        }
      }
    });
  }


  show(name: string, msg: string, type: NotificationType, persistent: boolean = false) {
    this.params = {
      name      : name,
      msg       : msg,
      type      : type,
      persistent: persistent,
    };

    if (persistent) {
      this.notificationList[name] = this.params;
    } else {
      this._params.next(this.params);
    }
  }

  hide(name: string) {
    this.params = {
      name      : name,
      msg       : '',
      type      : 'info',
      persistent: false,
    };
    this._params.next(this.params);
  }
}
