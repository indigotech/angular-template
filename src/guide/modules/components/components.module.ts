import { NgModule }      from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from 'widgets/widgets.module';

import { componentsRouting } from './components.routing';

import {Accordion,
  Badge,
  Button,
  Carousel,
  Chart,
  Color,
  Container,
  Custom,
  CodeConventions,
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
  Typography,
  Tab,
  ToggleSwitch } from './';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    WidgetsModule,
    componentsRouting,
  ],
  declarations: [
    Accordion,
    Badge,
    Button,
    Carousel,
    Chart,
    Color,
    Container,
    Custom,
    CodeConventions,
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
    Typography,
    ToggleSwitch,
  ],
})

export class ComponentsModule { }
