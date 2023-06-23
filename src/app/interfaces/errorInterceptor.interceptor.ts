import {
  HttpErrorResponse,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from '../services/toastr.service';
import { EMPTY, catchError } from 'rxjs';

const ERROR_MESSAGES = {
  serverError: 'Server error, retry later',
  genericError: 'Some error, retry later',
};

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  let toastrMessage = '';
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        const status = error.status;
        if (status >= 500) {
          toastrMessage = ERROR_MESSAGES.serverError;
          toastrService.setSowToastr(true);
          toastrService.setToastrType('error');
          toastrService.setToastrMessage(toastrMessage);
          return EMPTY;
        }
        if (error.error && error.error?.['error']) {
          toastrMessage = error.error.error;
        } else {
          toastrMessage = ERROR_MESSAGES.genericError;
        }
      } else {
        toastrMessage = ERROR_MESSAGES.genericError;
      }
      toastrService.setToastrType('error');
      toastrService.setSowToastr(true);
      toastrService.setToastrMessage(toastrMessage);
      return EMPTY;
    })
  );
};
