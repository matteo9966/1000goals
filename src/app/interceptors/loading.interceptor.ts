import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  nxt: HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);
  loadingService.setShowLoader(true);
  return nxt(req).pipe(
    finalize(() => {
      setTimeout(() => {
        loadingService.setShowLoader(false);
      }, 1000);
    })
  );
};
