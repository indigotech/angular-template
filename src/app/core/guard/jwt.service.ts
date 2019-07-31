import { Injectable } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';

import * as _ from 'custom-lodash';

@Injectable()
export class JwtService {

  private jwtHelper: JwtHelper = new JwtHelper();

  isTokenValid(token: string) : boolean {
    if (_.get(token, 'length', 0) > 0) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
