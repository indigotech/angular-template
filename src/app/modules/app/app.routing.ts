import { Routes, RouterModule } from '@angular/router';

import { AppRoot } from './';

const appRoutes: Routes = [
  { path: '', component: AppRoot,
    children: [
      { path: 'account'       , loadChildren: 'app/modules/account/account.module#AccountModule' },
      { path: 'user'          , loadChildren: 'app/modules/users/user.module#UserModule' },
      { path: ''              , loadChildren: 'app/modules/home/home.module#HomeModule' },
    ]},
];

export const appRouting = RouterModule.forRoot(appRoutes);
