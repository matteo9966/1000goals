import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
export const canActivateDashboard: (fallbackURL: string) => CanActivateFn = (
  fallbackURL: string
) => {
  return () => {
    const userService = inject(UserService);
    const router = inject(Router);
    const gameID = userService.getUserData()?.user?.gameID;
    const isAdmin = userService.getUserData()?.user?.role === 'admin';

    if (isAdmin && !gameID) {
      return router.createUrlTree([fallbackURL]);
    }

    return true;
  };
};
