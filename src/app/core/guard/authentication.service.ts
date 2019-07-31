import { Injectable, Injector } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { AuthenticationToken } from './authentication.token';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthenticationService {

  public onAuthChange:  Subject<any>;
  private authenticationToken: AuthenticationToken;

  constructor(
    private injector: Injector,
    private jwtService: JwtService,
  ) {
    this.authenticationToken = injector.get(AuthenticationToken);
    this.onAuthChange = this.authenticationToken.onAuthChange;
  }

  getToken(): string {
    return this.authenticationToken.token;
  }

  login(token: string) {
    this.authenticationToken.token = token;
  }

  isLogged(): boolean {
    return this.jwtService.isTokenValid(this.authenticationToken.token);
  }

  logout() {
    this.authenticationToken.clear();
  }
}
