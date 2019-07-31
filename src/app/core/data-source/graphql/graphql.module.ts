import { Apollo } from 'apollo-angular';
import {
  GraphqlClient,
  GraphqlInterceptor,
  GraphqlService,
} from './';
import { ModuleWithProviders, NgModule, InjectionToken, Provider, Type } from '@angular/core';

import { ApolloClient } from 'apollo-client';
import { AuthenticationService } from 'app/core/guard';

@NgModule({
})
export class GraphqlModule {
  static forRoot(apiUrl: string, interceptor?: {interceptor: any, deps?: any[]}): ModuleWithProviders {

    let injectionToken = new InjectionToken<GraphqlClient>('GraphqlClient');
    let apiURLInjectionToken = new InjectionToken<string>('API_URL');
    let graphqlInterceptorInjectionToken = new InjectionToken<GraphqlInterceptor>('GraphqlInterceptor');

    let interceptors = [];

    if (interceptor) {
      interceptors.push(
        { provide: graphqlInterceptorInjectionToken, useClass: interceptor.interceptor, deps: interceptor.deps },
        { provide: injectionToken, useClass: GraphqlClient, deps: [apiURLInjectionToken, graphqlInterceptorInjectionToken] },
      );
    } else {
      interceptors.push(
        { provide: injectionToken, useClass: GraphqlClient, deps: [apiURLInjectionToken] },
      );
    }


    return {
      ngModule: GraphqlModule,
      providers: [
        { provide: apiURLInjectionToken, useValue: apiUrl},
        ...interceptors,
        { provide: GraphqlService, useFactory: graphqlServiceFactory, deps: [injectionToken]},
      ],
    };
  }
}

function graphqlServiceFactory( graphqlClient ) {
  return new GraphqlService(graphqlClient);
}
