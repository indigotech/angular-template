import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { defer } from 'rxjs/observable/defer';

import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase  } from 'angularfire2/database';
import * as firebase from 'firebase';

import { FirebaseService, TransformEmptyObject } from './';

@Injectable()
export class FirebaseClientSideService implements FirebaseService {

  constructor(
    private authService: AngularFireAuth,
    private dbService: AngularFireDatabase) {}

  login(email: string, password: string): Observable<any> {
    return Observable.defer(
      () => this.authService
      .auth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<void> {
    return Observable.defer(
      () => this.authService
      .auth.signOut());
  }

  @TransformEmptyObject()
  list<T>(entityRef: string): Observable<T> {
    return this.dbService.object(entityRef);
  }

  @TransformEmptyObject()
  fetch<T>(entityRef: string, id: string): Observable<T> {
    return this.dbService.object(`${entityRef}/${id}`);
  }

  update<T>(entityRef: string, entity: T, id: string): Observable<void> {
    return Observable.defer(() => Observable.fromPromise(this.dbService.list(entityRef).update(id, entity)));
  }

  push<T>(entityRef: string, entity: T): Observable<void> {
    return Observable.defer(() => this.dbService.list(entityRef).push(entity));
  }

  remove(entityRef: string, id: string): Observable<void> {
    return Observable.defer(() => this.dbService.list(entityRef).remove(id));
  }

  upload(entityRef: string, file: any): Observable<string> {
    let storageEntityRef = firebase.storage().ref().child(`${entityRef}/${file.name}`);
    return Observable.defer(() => Observable.fromPromise(storageEntityRef.put(file))
    .map((snap) => {
      return snap.downloadURL;
    }));
  }
}
