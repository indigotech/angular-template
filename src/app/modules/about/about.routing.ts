import { Routes, RouterModule } from '@angular/router';

import { About } from './';

const aboutRoutes: Routes = [
  { path: '', component: About },
];

export const aboutRouting = RouterModule.forChild(aboutRoutes);
