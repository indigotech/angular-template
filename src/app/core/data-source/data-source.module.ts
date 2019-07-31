import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { ModuleWithProviders, NgModule, Provider, Type, InjectionToken } from '@angular/core';

import { HttpClient } from './http/http-client';
import { HttpInterceptor } from './http/http-interceptor';
import { HttpInterceptorBackend } from './http/http-interceptor-backend';

@NgModule({
  imports: [
  ],
  providers: [
    HttpClient,
  ],
})
export class DataSourceModule {
  static withInterceptors(interceptorTypes: {interceptor: Type<HttpInterceptor>, deps: any[]}[]): ModuleWithProviders {
    let injectionToken = new InjectionToken<HttpInterceptor>('HttpInterceptor');

    let interceptorProviders: Provider[] = interceptorTypes.map(item => {
      return {provide: injectionToken, useClass: item.interceptor, multi: true, deps: item.deps};
    });

    return {
      ngModule: DataSourceModule,
      providers: interceptorProviders.concat([
        {provide: HttpInterceptorBackend, useClass: HttpInterceptorBackend, deps: [injectionToken, XHRBackend]},
        {provide: Http, useFactory: httpFactory, deps: [HttpInterceptorBackend, RequestOptions]},
      ]),
    };
  }
}

function httpFactory(httpInterceptorBackend: HttpInterceptorBackend, requestOptions: RequestOptions): Http {
  return new Http(httpInterceptorBackend, requestOptions);
}
