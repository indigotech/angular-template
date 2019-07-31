import { NgModule } from '@angular/core';

import { AuthenticationGuard, JwtService } from './';


@NgModule({
  providers: [
    AuthenticationGuard,
    JwtService,
  ],
})
export class GuardModule {}
