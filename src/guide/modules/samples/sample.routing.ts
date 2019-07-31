import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {
  FilterSample,
  FormSample,
  Sample,
  SearchSample,
} from './';


const sampleRoutes: Routes = [
  { path: 'sample',
    component: Sample,
    children: [
      { path: 'filter',   component: FilterSample },
      { path: 'form',     component: FormSample },
      { path: 'search',   component: SearchSample },
    ],
  },
];

export const sampleRouting: ModuleWithProviders = RouterModule.forChild(sampleRoutes);
