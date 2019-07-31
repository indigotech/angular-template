import { Routes, RouterModule } from '@angular/router';

import { Four04 } from './';

const exceptionRoutes: Routes = [
  { path: 'fourOFour', component: Four04 },
  { path: '**', component: Four04 },
];

export const exceptionRouting = RouterModule.forChild(exceptionRoutes);
