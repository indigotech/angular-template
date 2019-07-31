import { Routes, RouterModule } from '@angular/router';


const guideRoutes: Routes = [
  // {path: 'lazy', loadChildren: 'src/guide/components/components.module#ComponentsModule'}
];

export const guideRouting = RouterModule.forRoot(guideRoutes, { useHash: true });
