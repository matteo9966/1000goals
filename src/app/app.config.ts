import { ApplicationConfig, InjectionToken } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptors/errorInterceptor.interceptor';

export const API_BASE = new InjectionToken<string>('api-base-token');
export const PAGES_BASE = new InjectionToken<string>('pages-base-token'); //the base of the routing (used when sharing the link)
export const STORAGE = new InjectionToken<Storage>('storage');
export const USERDATA_STORAGE_KEY = new InjectionToken<string>('storage-key', {
  factory: () => 'userData',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    //                           ^^     add this to use the input bindings of the url
    provideAnimations(),
    provideHttpClient(withInterceptors([errorInterceptor])),

    { provide: API_BASE, useValue: 'http://localhost:5000/api/v1' },
    // { provide: API_BASE, useValue: 'https://one000-game-api-staging.onrender.com/api/v1' },
    { provide: STORAGE, useValue: sessionStorage },
    { provide: PAGES_BASE, useValue: 'https://192.168.1.178:4200/' },
  ],
};
