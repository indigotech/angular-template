import {
  AccountResource,
  CrudResourceFactory,
  FirebaseResourceFactory,
  FileResource,
} from './';
import { CoreModule, DataSourceModule } from 'app/core';

import { API_URL } from './constants';
import { ApolloModule } from 'apollo-angular';
import { AuthenticationService } from 'app/core/guard';
import { GraphqlCustomInterceptor } from './graphql-custom.interceptor';
import { GraphqlModule } from 'app/core/data-source/graphql';
import { NgModule } from '@angular/core';
import { ResourceInterceptor }  from './resource.interceptor';

@NgModule({
  imports: [
    CoreModule,
    DataSourceModule.withInterceptors([
      { interceptor: ResourceInterceptor, deps: [] },
    ]),
    GraphqlModule.forRoot(API_URL, {interceptor: GraphqlCustomInterceptor, deps: [AuthenticationService]}),
  ],
  providers: [
    CrudResourceFactory,
    FirebaseResourceFactory,
    AccountResource,
    FileResource,
  ],
})

export class ResourceModule {}



