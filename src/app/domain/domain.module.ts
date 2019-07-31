import {
  LoginUseCase,
  UserListUseCase,
  FirebaseUserUseCase,
} from './';

import { NgModule }             from '@angular/core';
import { ResourceModule }       from 'app/resources';

@NgModule({
  imports: [
    ResourceModule,
  ],
  providers: [
    LoginUseCase,
    UserListUseCase,
    FirebaseUserUseCase,
  ],
})
export class DomainModule {}
