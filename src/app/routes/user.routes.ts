import { Routes } from '@angular/router';
import { ROUTES } from './routes';
export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/user/user.component').then((c) => c.UserComponent),
    children: [
      {
        path: ROUTES.user.dashboard,
        loadComponent: () =>
          import('../pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: ROUTES.user.goals,
        loadComponent: () =>
          import('../pages/goals/goals.component').then(
            (c) => c.GoalsComponent
          ),
      },
      {
        path: ROUTES.user.proposed,
        loadComponent: () =>
          import('../pages/proposed-goals/proposed-goals.component').then(
            (c) => c.ProposedGoalsComponent
          ),
      },
      {
        path: ROUTES.user.leaderboard,
        loadComponent: () =>
          import('../pages/leaderboard/leaderboard.component').then(
            (c) => c.LeaderboardComponent
          ),
      },
      {
        path: ROUTES.user.managegame,
        loadComponent: () =>
          import('../pages/manage-game/manage-game.component').then(
            (c) => c.ManageGameComponent
          ),
      },
      {
        path: ROUTES.user.players,
        loadComponent: () =>
          import('../pages/admin-members/admin-members.component').then(
            (c) => c.AdminMembersComponent
          ),
      },
      {
        path: ROUTES.user.details,
        loadComponent: () =>
          import('../pages/user-details/user-details.component').then(
            (c) => c.UserDetailsComponent
          ),
      },

      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
];
