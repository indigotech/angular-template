import { Observable } from 'rxjs/Observable';

import { FirebaseService } from 'app/core';

export class FirebaseResource<List, Entity> {

  constructor(private firebaseService: FirebaseService, private entityRef: string) {}

  list(): Observable<List> {
    return this.firebaseService.list<List>(this.entityRef);
  }

  create(params: Entity): Observable<void> {
    return this.firebaseService.push<Entity>(this.entityRef, params);
  }

  update(id: string, params: Entity): Observable<void> {
    return this.firebaseService.update<Entity>(this.entityRef, params, id);
  }

  delete(id: string): Observable<void> {
    return this.firebaseService.remove(this.entityRef, id);
  }

  fetch(id: string): Observable<Entity> {
    return this.firebaseService.fetch(this.entityRef, id);
  }

}
