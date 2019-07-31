import { Routes, RouterModule } from '@angular/router';

import {
  UserNew,
  UserEdit,
  UserList } from './';

const userRoutes: Routes = [
  { path: '',    component: UserList },
  { path: 'new', component: UserNew },
  { path: ':id', component: UserEdit },
];

export const userRouting = RouterModule.forChild(userRoutes);
