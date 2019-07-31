import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { RenderModule } from '@tq-angular/render';

import { NotificationService } from 'app/modules/shared/notification/notification.service';

import { ComponentsModule } from './components/components.module';
import { ExceptionModule } from './exception/exception.module';
import { SampleModule } from './samples/sample.module';

import { Guide } from './';
import { WidgetsModule } from 'widgets/widgets.module';

import { guideRouting } from './guide.routing';

@NgModule({
  imports:      [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    RenderModule,
    ComponentsModule,
    SampleModule,
    WidgetsModule,
    ExceptionModule,
    guideRouting,
  ],
  providers:    [ NotificationService ],
  declarations: [ Guide ],
  exports:      [ ],
  bootstrap:    [ Guide ],
})
export class GuideModule { }
