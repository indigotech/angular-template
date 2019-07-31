import { AuthenticationService } from 'app/core/guard';
import { GraphqlInterceptor } from 'app/core/data-source/graphql';

export class GraphqlCustomInterceptor implements GraphqlInterceptor {

  constructor(private auth: AuthenticationService) {}

  before(req: any, next: any) {
    next();
  }

  after(res: any, next: any) {
    next();
  }
}
