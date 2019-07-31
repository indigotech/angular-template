import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {
  Accordion,
  Badge,
  Button,
  Carousel,
  Chart,
  CodeConventions,
  Color,
  Container,
  Custom,
  Dropdown,
  Form,
  Grid,
  Icon,
  List,
  Loading,
  Notification,
  Orbit,
  Other,
  Pagination,
  Placeholder,
  Rating,
  SVGAnimation,
  Tab,
  ToggleSwitch,
  Typography,
} from './';


const componentsRoutes: Routes = [
  { path: '',                component: Color },
  { path: 'accordion',       component: Accordion },
  { path: 'badge',           component: Badge },
  { path: 'button',          component: Button },
  { path: 'carousel',        component: Carousel },
  { path: 'chart',           component: Chart },
  { path: 'color',           component: Color },
  { path: 'container',       component: Container },
  { path: 'custom',          component: Custom },
  { path: 'dropdown',        component: Dropdown },
  { path: 'links',           component: CodeConventions },
  { path: 'form',            component: Form },
  { path: 'grid',            component: Grid },
  { path: 'icon',            component: Icon },
  { path: 'list',            component: List },
  { path: 'loading',         component: Loading },
  { path: 'notification',    component: Notification },
  { path: 'orbit',           component: Orbit },
  { path: 'other',           component: Other },
  { path: 'pagination',      component: Pagination },
  { path: 'placeholder',     component: Placeholder },
  { path: 'rating',          component: Rating },
  { path: 'svganimation',    component: SVGAnimation },
  { path: 'tab',             component: Tab },
  { path: 'toggle-switch',   component: ToggleSwitch },
  { path: 'typography',      component: Typography },
];


export const componentsRouting: ModuleWithProviders = RouterModule.forChild(componentsRoutes);
