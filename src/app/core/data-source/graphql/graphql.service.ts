import { Apollo } from 'apollo-angular';
import { ApolloClient } from 'apollo-client';
import { GraphqlClient } from './graphql.client';
import { Injectable } from '@angular/core';

@Injectable()
export class GraphqlService extends Apollo {
  constructor(private graphqlClient: GraphqlClient) {
    super();
  }
}
