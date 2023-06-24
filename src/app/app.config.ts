import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interfaces/errorInterceptor.interceptor';

export const API_BASE = new InjectionToken<string>('api-base-token');
export const USERDATA_STORAGE_KEY = new InjectionToken<string>('storage-key',{factory:()=>'userData'});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    { provide: API_BASE, useValue: 'http://localhost:5000/api/v1' },
    { provide: Storage, useExisting:sessionStorage}
  ],
};
