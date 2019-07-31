import { Routes, RouterModule } from '@angular/router';

import { Home } from './';

const homeRoutes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
];

export const homeRouting = RouterModule.forChild(homeRoutes);
