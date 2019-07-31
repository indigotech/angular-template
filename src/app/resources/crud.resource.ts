import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, RequestBuilder, AuthenticationService } from 'app/core';

import { BearerHeadersAppender } from './resource-headers.appender';

import { EntityEndpoints } from './';
import { API_URL } from './constants';



export class CrudResource {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService, private entityEndpoints: EntityEndpoints) { }

  list(params: any): Observable<any> {
    const requestBuilder = new RequestBuilder(RequestMethod.Get, API_URL, this.entityEndpoints.list)
                              .withHeader(new BearerHeadersAppender(this.authService.getToken()));

    if (params) {
      requestBuilder.withParams(params);
    }

    return this.httpClient.request(requestBuilder);
  }

  update(id: string, body: any): Observable<any> {
    const requestBuilder = new RequestBuilder(RequestMethod.Put, API_URL, `${this.entityEndpoints.entity}/${id}`)
                              .withHeader(new BearerHeadersAppender(this.authService.getToken()))
                              .withBody(body);

    return this.httpClient.request(requestBuilder);
  }

  delete(id: string): Observable<any> {
    const requestBuilder = new RequestBuilder(RequestMethod.Delete, API_URL, `${this.entityEndpoints.entity}/${id}`)
                              .withHeader(new BearerHeadersAppender(this.authService.getToken()));

    return this.httpClient.request(requestBuilder);
  }

  create(body: any): Observable<any> {
    const requestBuilder = new RequestBuilder(RequestMethod.Post, API_URL, this.entityEndpoints.entity)
                              .withHeader(new BearerHeadersAppender(this.authService.getToken()))
                              .withBody(body);

    return this.httpClient.request(requestBuilder);
  }

  fetch(id: string): Observable<any> {
    const requestBuilder = new RequestBuilder(RequestMethod.Get, API_URL, `${this.entityEndpoints.entity}/${id}`)
                              .withHeader(new BearerHeadersAppender(this.authService.getToken()));

    return this.httpClient.request(requestBuilder);
  }

}
