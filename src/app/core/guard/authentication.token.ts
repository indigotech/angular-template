import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { LocalStorage } from 'app/core/data-source/local-storage';

const BEARER_TOKEN = 'template-angular-site-bearer';


@Injectable()
export class AuthenticationToken {

  public onAuthChange: Subject<any> = new Subject<any>();

  @LocalStorage(BEARER_TOKEN)
  private _token : string;

  constructor() { }

  get token(): any {
    return this._token;
  }

  set token(data: any) {
    this.clear();
    this._token = data;
    this.onAuthChange.next(data);
  }

  clear() {
    this._token = undefined;
  }
}
