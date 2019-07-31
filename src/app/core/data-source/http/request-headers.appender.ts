import { Headers } from '@angular/http';

export interface HeadersAppender {
  append(headers: Headers) : void;
}
