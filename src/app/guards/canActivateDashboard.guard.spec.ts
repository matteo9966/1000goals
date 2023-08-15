import { LoginResponse } from '1000-goals-types/src/Responses';
import { UserService } from '../services/user.service';
import { canActivateDashboard } from './canActivateDashboard.guard';
import { TestBed } from '@angular/core/testing';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { provideLocationMocks } from '@angular/common/testing';
import { Location } from '@angular/common';

const mockUser = {
  user: {
    gameID: 'game-id',
    role: 'admin',
  },
} as unknown as LoginResponse['data'];

const mockNoUser = {
  user: {}, //missing gameID so not created
} as unknown as LoginResponse['data'];

const mockAdminWOGameID = {
  user: {
    role: 'admin',
    gameId: null, //no gameID
  },
} as unknown as LoginResponse['data'];

describe('canActivateDashboardGuard', () => {
  let mockRouter: Router;

  //mock the router

  /**
   * @description using runInInjectionContext makes me run the guard in the context of Test bed using the providers array for its injector
   * @returns
   */
  function setupTest(userData: LoginResponse['data']) {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            userData: userData,
            getUserData() {
              return this.userData;
            },
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    });
  }

  it('should have defined userData', () => {
    setupTest(mockUser);
    const userservice = TestBed.inject(UserService);
    expect(userservice.getUserData()?.user.gameID).toBe('game-id');
    expect(userservice.getUserData()?.user.role).toBe('admin');
  });

  it('should allow user with game', () => {
    setupTest(mockUser); //configured testBed with the mockUSer
    const dashboardGuard = canActivateDashboard('/home');
    const result = TestBed.runInInjectionContext(() =>
      dashboardGuard({} as any, {} as any)
    );
    expect(result).toBe(true);
  });

  it('should navigate to create game if is admin and nogame', () => {
    setupTest(mockAdminWOGameID);
    const dashboardGuard = canActivateDashboard('/creategame');
    TestBed.runInInjectionContext(() => {
      dashboardGuard({} as any, {} as any);
    });
    const createUrlTreeSpy = mockRouter.createUrlTree as jasmine.Spy;
    expect(createUrlTreeSpy).toHaveBeenCalled();
  });
});

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outler></router-outlet>`,
  standalone: true,
})
class RootComponent {}
@Component({
  selector: 'app-fallback',
  imports: [RouterOutlet],
  template: `<div>fallback url</div>`,
  standalone: true,
})
class FallbackComponent {}

@Component({
  selector: 'app-test-fallback',
  standalone: true,
  template: `<div>this is fallbacjk</div>`,
  imports: [],
})
class DashboardTestComponent {}

describe('canActivateDashboard (integrated)', () => {
  const fallbackURl = 'fallback-url';
  function setupTest(userData: LoginResponseBody) {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: UserService,
          useValue: {
            userData: userData,
            getUserData() {
              return this.userData;
            },
          },
        },
        provideRouter([
          { path: fallbackURl, component: FallbackComponent },
          {
            path: 'dashboard',
            component: DashboardTestComponent,
            canActivate: [canActivateDashboard(fallbackURl)],
          },
        ]),
        provideLocationMocks(),
      ],
    });
  }
  it('should navigate to dashboard if user is admin and there is a gameID', async () => {
    const user = {
      user: {
        role: 'admin',
        gameID:'some-valid-game-id'
      },
      game: {
      },
    } as unknown as LoginResponseBody;
    setupTest(user);
    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);
    const result = await router.navigate(['dashboard']);
    expect(result).toBeTrue();
    expect(location.path()).toContain('dashboard');
  });

  it('should navigate to the fallbackurl if user admin and there is no gameId', async () => {
    const user = {
      user: {
        role: 'admin',
        gameID: null,
      },
      game: {},
    } as unknown as LoginResponseBody;
    setupTest(user);
    const router = TestBed.inject(Router);
    spyOn(router, 'createUrlTree').and.callThrough();
    const location = TestBed.inject(Location);
    const result = await router.navigate(['dashboard']);

    expect(result).toBeTrue();
    expect(router.createUrlTree).toHaveBeenCalled();
  });
});
