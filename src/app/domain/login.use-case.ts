import { AccountResource } from 'app/resources';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'app/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginUseCase {

  constructor( private accountResource: AccountResource) {}

  execute(email: string, pass: string): Observable<LoginResponse> {
    return this.accountResource.login(email, pass);
  }
}
