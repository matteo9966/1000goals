/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

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
