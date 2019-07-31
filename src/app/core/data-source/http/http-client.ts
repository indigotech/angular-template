import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';


import { RequestBuilder } from './request.builder';
import * as _ from 'custom-lodash';

const HTTP_STATUS = {
  NO_CONNECTION: 0,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

@Injectable()
export class HttpClient {

  public onUnauthorized: Subject<any> = new Subject<any>();

  constructor(private http: Http) {}

  request(requestBuilder: RequestBuilder): Observable<any> {
    return this.http.request(requestBuilder.build())
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
    ;
  }

  private extractData(res: Response) {
    let body;

    try {
      body = res.json();
    } catch (e) {
      console.error(res, e);
    }
    return body || { };
  }

  private handleError(error: any) {
    if (error == null) {
      return Observable.throw('Erro durante requisição.');
    }

    const defaultErrMessage = `${error.status} - ${error.statusText}`;
    switch (error.status) {
      case HTTP_STATUS.UNAUTHORIZED:
      case HTTP_STATUS.FORBIDDEN:
        this.onUnauthorized.next(true);
        break;

      case HTTP_STATUS.NO_CONNECTION:
        return Observable.throw('Erro de conexão com a internet');

      default:
        break;
    }

    let responseError;
    try {
      responseError = error.json();
    } catch (e) {
      console.error(error, e);
    }

    if ( (responseError.errors instanceof Array ) && responseError.errors.length > 0) {
      return Observable.throw(responseError.errors[0].message);
    } else if (_.get(responseError, 'errors', false)) {
      return Observable.throw(responseError.errors);
    } else {
      return Observable.throw(defaultErrMessage);
    }
  }
}
