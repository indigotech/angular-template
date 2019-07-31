import { Injectable, Inject } from '@angular/core';
import { FirebaseService, FirebaseServiceToken } from 'app/core';

import { FirebaseResource } from './';

@Injectable()
export class FirebaseResourceFactory<List, Entity> {

  constructor(@Inject(FirebaseServiceToken) private firebaseService: FirebaseService) {}

  getResource(databaseRef: string): FirebaseResource<List, Entity> {
    return new FirebaseResource<List, Entity>(this.firebaseService, databaseRef);
  }
}
