import {
  Headers,
  Request,
  ResponseContentType,
  RequestMethod,
  RequestOptions,
  URLSearchParams } from '@angular/http';

import { HeadersAppender } from './request-headers.appender';

export class RequestBuilder {
  private headersAppenders: HeadersAppender[] = [];
  private responseType: ResponseContentType = ResponseContentType.Json;
  private search: URLSearchParams;
  private body: any;
  private url: string;

  constructor(private method: RequestMethod, base: string, endpoint: string = '') {
    this.url = base + endpoint;
  }

  withParams(params: any) {
    if (params) {
      this.search = new URLSearchParams();

      for (let key in params) {
        this.search.set(key, params[key]);
      }
    }

    return this;
  }

  withBody(body: any) {
    this.body = body;
    return this;
  }

  withHeader(appender: HeadersAppender) {
    this.headersAppenders.push(appender);
    return this;
  }

  withResponseType(responseType: ResponseContentType) {
    this.responseType = responseType;
    return this;
  }

  build(): Request {
    let method        = this.method;
    let url           = this.url;
    let body          = this.body;
    let responseType  = this.responseType;
    let search        = this.search;
    let headers       = new Headers();

    for (let appender of this.headersAppenders) {
      appender.append(headers);
    }

    let options = new RequestOptions({ method, url, headers, body, search, responseType });

    return new Request(options);
  }
}
