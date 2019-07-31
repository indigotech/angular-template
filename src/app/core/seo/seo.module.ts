import { NgModule } from '@angular/core';

import { RenderModule } from '@tq-angular/render';

import { BrowserModule } from 'app/core/browser';

import { SeoService } from './seo.service';

@NgModule({
  imports: [ RenderModule, BrowserModule ],
  providers: [ SeoService ],
})
export class SeoModule {}
