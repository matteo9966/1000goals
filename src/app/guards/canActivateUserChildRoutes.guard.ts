import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ROUTES } from '../routes/routes';
export const canActivateUserChildRoutesGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  if (!userService.getUserData()) {
    return false;
  }
  const userdata = userService.getUserData();
  const tempPassword = userdata?.user?.tempPassword;
  if (!tempPassword) return true;
  const urlTree = router.createUrlTree([ROUTES.changePassword]);
  return urlTree;
};
