import { Injectable } from '@angular/core';
import { HttpClient, AuthenticationService } from 'app/core';
import { CrudResource, CrudResourceMap } from './';


@Injectable()
export class CrudResourceFactory {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {}

  getResource(entity: string): CrudResource {
    return new CrudResource(this.httpClient, this.authService, CrudResourceMap[entity]);
  }
}
