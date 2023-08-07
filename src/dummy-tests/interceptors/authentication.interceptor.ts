import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${userService.sessionToken}`,
    },
  });
  console.log(request.headers.get('Authorization'));

  return next(request);
};
