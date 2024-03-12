import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), {
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true
}]
};
