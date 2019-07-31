import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WidgetsModule } from 'widgets';
import { DomainModule } from 'app/domain';

import { NavigationControlDirective } from './';
import { NotificationDirective } from './notification/notification.directive';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    DomainModule,
    WidgetsModule,
  ],
  declarations: [
    NavigationControlDirective,
    NotificationDirective,
  ],
  exports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    NavigationControlDirective,
    NotificationDirective,
    DomainModule,
    WidgetsModule,
  ],
})
export class SharedModule { }
