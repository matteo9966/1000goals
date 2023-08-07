import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { EMPTY } from 'rxjs';
import { UserService } from '../services/user.service';
export type authorizationInterceptorFactory = (
  routes: string[]
) => HttpInterceptorFn;

export const authorizationInterceptor: authorizationInterceptorFactory =
  function (routes) {
    return (req, next) => {
      const loginService = inject(LoginService);
      const url = req.url;
      const hasRoute = routes.some((rout) => rout.includes(url));
      if (hasRoute) {
        const sessionToken = loginService.sessionToken;
        if (!sessionToken) {
          console.log('missing session token');
          return EMPTY;
        }

        const reqClone = req.clone({
          setHeaders: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        return next(reqClone);
      } else {
        return next(req);
      }
    };
  };
