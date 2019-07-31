import { Headers } from '@angular/http';

import { AuthenticationToken, HeadersAppender } from 'app/core';

export class JsonHeadersAppender implements HeadersAppender {
  append(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }
}


export class BearerHeadersAppender implements HeadersAppender {
  constructor(private authenticationToken: string) { }

  append(headers: Headers) {
    headers.append('Authorization', this.authenticationToken);
  }
}
