import { Request, Response } from '@angular/http';

import { HttpInterceptor } from 'app/core/data-source';
import { Observable } from 'rxjs/Observable';

export class ResourceInterceptor implements HttpInterceptor {

  before(request: Request): Request {
    return request;
  }

  after(res: Observable<Response>): Observable<any> {
    return res.map(response => response);
  }
}
