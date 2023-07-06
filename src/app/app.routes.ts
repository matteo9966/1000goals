import { Routes } from '@angular/router';
import { ROUTES } from './routes/routes';
import { canActivateUserChildRoutesGuard } from './guards/canActivateUserChildRoutes.guard';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/cta',
  },
  {
    path: ROUTES.home.base,
    loadChildren: () => import('./routes/home.routes').then((r) => r.homeRoute),
  },

  {
    path: ROUTES.user.base,
    title: 'User',
    loadChildren: () =>
      import('./routes/user.routes').then((r) => r.userRoutes),
    canActivateChild: [canActivateUserChildRoutesGuard],
  },
  {
    path: ROUTES.changePassword,
    loadComponent: () =>
      import('./pages/change-password/change-password.component').then(
        (c) => c.ChangePasswordComponent
      ),
  },

  //TODO: { path: '**', component: PageNotFoundComponent },
];
