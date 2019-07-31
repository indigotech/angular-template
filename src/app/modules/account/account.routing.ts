import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AccountLogin, AccountEditPassword } from './';

export const accountRoutes: Routes = [
  { path: 'login', component: AccountLogin },
  { path: 'edit-password', component: AccountEditPassword },
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(accountRoutes);
