import { UserListQuery, UserListQueryVariables, UsersOrderByFieldEnum } from '../models/graphql.schema';

import { Apollo } from 'apollo-angular';
import { GraphqlService } from 'app/core/data-source/graphql';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const  PAGE_WINDOW = 20;
@Injectable()
export class UserListUseCase {

  constructor(private gqlService: GraphqlService) {}

  exec(page: number, sortBy?: any, order?: any): Observable<any> {

    let query: UserListQueryVariables = {
      limit: PAGE_WINDOW,
      offset: (page - 1) * PAGE_WINDOW,
      orderBy: [{
        sort: sortBy,
        direction: order,
      }],
    };

    return this.gqlService.query<UserListQuery>({
      query: require('./user-list.graphql'),
      variables: query,
    }).map( data => {

      return {
        nodes: data.data.Users.nodes,
        totalPages: Math.round(data.data.Users.count / PAGE_WINDOW),
      };
    });
  }
}
