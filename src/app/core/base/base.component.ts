import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NotificationService, NotificationType } from 'app/modules/shared/notification';

export abstract class BaseComponent implements OnDestroy {

  public isLoading     : boolean;
  public loadingStack  : number;

  protected defaultErrorMsg: string = 'Problemas para realizar a ação executada, tente novamente.';

  protected subscriptions: Subscription[] = [];

  constructor(
    private notification : NotificationService,
  ) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // Notification

  showErrorMsg(name: string, err: any, persistent?: boolean) {
    let message = this.defaultErrorMsg;

    if (err != null) {
      console.error(err.toString());
      message = err.toString();
    }

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    this.notification.show(name, message, 'error', persistent);
  }

  showSuccessMsg(name: string, message: string, persistent?: boolean) {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    this.notification.show(name, message, 'success', persistent);
  }

  hideMsg(name: string) {
    this.notification.hide(name);
  }

  // Loading

  showLoading() {
    if (!this.loadingStack || this.loadingStack <= 0) { this.loadingStack = 0; } // Lazy initiation && Underflow guard
    this.loadingStack++;

    this.isLoading = true;
  }

  hideLoading() {
    this.loadingStack--;
    if (!this.loadingStack || this.loadingStack <= 0) { this.loadingStack = 0; } // Lazy initiation && Underflow guard

    // angular-universal is breaking when rendering objects in DOM (a bug which should be fixed in next relesase)
    // in the meantime we have to avoid this bug otherwise the seo does not work
    if (this.loadingStack === 0) {
      this.isLoading = false;
    }
  }
}
