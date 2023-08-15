import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
/**
 * @description this guard checks if the user can navigate to the dashboard. if the game is not created it must navigate to the create game page
 * @param fallbackURL the url to navigate to if the admin still did not create the game
 * @returns
 */
export const canActivateDashboard: (fallbackURL: string) => CanActivateFn = (
  fallbackURL: string
) => {
  return () => {
    const userService = inject(UserService);
    const router = inject(Router);
    const gameID = userService.getUserData()?.user?.gameID;
    const isAdmin = userService.getUserData()?.user?.role === 'admin';
    
    console.log(gameID,isAdmin)
    if (isAdmin && !gameID) {
    
      console.log('i should get called!')
      return router.createUrlTree([fallbackURL]);
    }
    return true;
  };
};
