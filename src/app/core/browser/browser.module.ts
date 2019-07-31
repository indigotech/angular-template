import { NgModule } from '@angular/core';

import { RenderModule } from '@tq-angular/render';

import { ScriptLoader, WindowProvider } from './';

@NgModule({
  imports: [ RenderModule ],
  providers: [
    ScriptLoader,
    WindowProvider,
  ],
})
export class BrowserModule {}
