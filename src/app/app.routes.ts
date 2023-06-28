import { Routes } from '@angular/router';
import { ROUTES } from './routes/routes';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: 'home/cta',
    redirectTo: [ROUTES.user.base,ROUTES.user.newgame].join('/'),
  },
  // {
  //   path: 'login',
  //   title: 'Login',
  //   loadComponent: () =>
  //     import('./pages/login/login.component').then((c) => c.LoginComponent),
  // },
  // {
  //   path: 'signup',
  //   title: 'Signup',
  //   loadComponent: () =>
  //     import('./pages/signup-page/signup-page.component').then(
  //       (c) => c.SignupPageComponent
  //     ),
  // },
  // {
  //   path: 'home',
  //   title: 'Home',
  //   loadComponent: () =>
  //     import('./pages/home/home.component').then((c) => c.HomeComponent),
  // },

  {
    path: ROUTES.home.base,
    loadChildren: () => import('./routes/home.routes').then((r) => r.homeRoute),
  },

  {
    path: ROUTES.user.base,
    title: 'User',
    loadChildren: () =>
      import('./routes/user.routes').then((r) => r.userRoutes),
  },

  //TODO: { path: '**', component: PageNotFoundComponent },
];
