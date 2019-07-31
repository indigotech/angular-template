export interface GraphqlInterceptor {
  before(req, next);
  after(res, next);
}
