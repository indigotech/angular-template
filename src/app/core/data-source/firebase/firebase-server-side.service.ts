import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FirebaseAppConfig } from 'angularfire2';

import { HttpClient, RequestBuilder } from 'app/core';
import { FirebaseService } from './';

// TODO Add authentication
@Injectable()
export class FirebaseServerSideService implements FirebaseService {

  constructor(private httpClient: HttpClient, private config: FirebaseAppConfig) {}

  login(email: string, password: string): Observable<any> {
    return Observable.of(true);
  }

  logout(): Observable<void> {
    return Observable.of(null);
  }

  list<T>(entityRef: string): Observable<T> {
    const requestBuilder = new RequestBuilder(RequestMethod.Get, this.config.databaseURL, `${entityRef}.json`);
    return this.httpClient.request(requestBuilder);
  }

  fetch<T>(entityRef: string, id: string): Observable<T> {
    const requestBuilder = new RequestBuilder(RequestMethod.Get, this.config.databaseURL, `${entityRef}/${id}.json`);
    return this.httpClient.request(requestBuilder);
  }

  update<T>(entityRef: string, entity: T, id: string): Observable<void> {
    const requestBuilder = new RequestBuilder(RequestMethod.Patch, this.config.databaseURL, `${entityRef}/${id}.json`)
                               .withBody(entity);
    return this.httpClient.request(requestBuilder);

  }

  push<T>(entityRef: string, entity: T): Observable<void> {
    const requestBuilder = new RequestBuilder(RequestMethod.Post, this.config.databaseURL, `${entityRef}.json`)
                               .withBody(entity);
    return this.httpClient.request(requestBuilder);
  }

  remove(entityRef: string, id: string): Observable<void> {
    const requestBuilder = new RequestBuilder(RequestMethod.Delete, this.config.databaseURL, `${entityRef}/${id}.json`);
    return this.httpClient.request(requestBuilder);
  }

  upload(entityRef: string, file: any): Observable<string> {
    // TODO Implement Upload using Firebase Rest API
    return Observable.of('');
  }

}
