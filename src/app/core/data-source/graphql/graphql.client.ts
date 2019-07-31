import { Apollo } from 'apollo-angular';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

import { GraphqlInterceptor } from './graphql.interceptor';

export class GraphqlClient {

  private networkInterface;
  private apolloClient: ApolloClient;

  constructor(private apiUrl, private interceptor?: GraphqlInterceptor) {

    this.networkInterface = createNetworkInterface({
      uri: apiUrl + 'graphql',
    });


    if (this.interceptor) {
      this.networkInterface.use([{
        applyMiddleware: (req: any, next: any) => {
          return this.interceptor.before(req, next);
        },
      }]);

      this.networkInterface.useAfter([{
        applyAfterware: (res: any, next: any) => {
          return this.interceptor.after(res, next);
        },
      }]);
    }

    this.apolloClient = new ApolloClient({ networkInterface: this.networkInterface });
  }



  public getGraphqlClient() {
    return this.apolloClient;
  }
}
