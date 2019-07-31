import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export const FirebaseServiceToken = new InjectionToken<FirebaseService>('FirebaseService');

export interface FirebaseService {

  login(email: string, password: string): Observable<any>;

  logout(): Observable<void>;

  list<T>(entityRef: string): Observable<T>;

  fetch<T>(entityRef: string, id: string): Observable<T>;

  update<T>(entityRef: string, entity: T, id: string): Observable<void>;

  push<T>(entityRef: string, entity: T): Observable<void>;

  remove(entityRef: string, id: string): Observable<void>;

  upload(entityRef: string, file: any): Observable<string>;

}
