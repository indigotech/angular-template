import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { PlatformService } from '@tq-angular/platform';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private platform: PlatformService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authenticationService.isLogged()) {
      return true;
    } else {
      if (this.platform.isBrowser()) {
        this.router.navigate(['/login', { 'return_path': state.url }]);
      } else {
        this.router.navigate(['/']);
      }
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    return this.canActivate(route, state);
  }
}
