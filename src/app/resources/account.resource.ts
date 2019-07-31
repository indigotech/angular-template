import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_URL } from './constants';
import { HttpClient, RequestBuilder } from 'app/core';
import { LoginResponse } from 'app/models';

const ENDPOINTS = {
  LOGIN : 'v1/admin/authenticate',
};

@Injectable()
export class AccountResource {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    let requestBuilder = new RequestBuilder(RequestMethod.Post, API_URL, ENDPOINTS.LOGIN)
                                .withBody({ email, password });

    return this.httpClient.request(requestBuilder);
  }
}
