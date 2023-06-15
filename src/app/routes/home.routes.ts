import { Routes } from '@angular/router';
import { ROUTES } from './routes';
export const homeRoute: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () =>
      import('../pages/home/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: ROUTES.home.cta,
        title: 'Actions',
        loadComponent: () =>
          import('../pages/home-cta/home-cta.component').then(
            (c) => c.HomeCtaComponent
          ),
      },
      {
        path: ROUTES.home.login,
        title: 'Login',
        loadComponent: () =>
          import('../pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: ROUTES.home.signup,
        title: 'Signup',
        loadComponent: () =>
          import('../pages/signup-page/signup-page.component').then(
            (c) => c.SignupPageComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cta',
      },
    ],
  },
];
