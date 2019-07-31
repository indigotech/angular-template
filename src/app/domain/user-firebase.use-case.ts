import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FirebaseResourceFactory } from 'app/resources';
import { User } from 'app/models';

@Injectable()
export class FirebaseUserUseCase {

  constructor(private factory: FirebaseResourceFactory<{ (id: string): User }, User>) {}

  list(): Observable<{ (id: string): User } > {
    return this.factory.getResource('users').list();
  }
}
