import { LoginResponse } from '1000-goals-types/src/Responses';
import { UserService } from '../services/user.service';
import { canActivateDashboard } from './canActivateDashboard.guard';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

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
  const mockUserService = jasmine.createSpyObj<UserService>('userService', [], {
    userData: mockUser,
  });

  //mock the router

  /**
   * @description using runInInjectionContext makes me run the guard in the context of Test bed using the providers array for its injector
   * @returns
   */
  function setupTest(userData: LoginResponse['data']) {
    mockRouter = jasmine.createSpyObj<Router>(['createUrlTree']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: { userData: userData },
        },
        { provide: Router, useValue: mockRouter },
      ],
    });
  }

  it('should have defined userData', () => {
    setupTest(mockUser);
    const userservice = TestBed.inject(UserService);
    expect(userservice.userData?.user.gameID).toBe('game-id');
    expect(userservice.userData?.user.role).toBe('admin');
  });

  it('should allow user with game', () => {
    setupTest(mockUser); //configured testBed with the mockUSer
    const dashboardGuard = canActivateDashboard('/home');
    const result = TestBed.runInInjectionContext(() =>
      dashboardGuard({} as any, {} as any)
    );
    expect(result).toBe(true);
  });

  it('should call createUrlTree if user is admin and does not have a gameID', () => {
    setupTest(mockAdminWOGameID);
    const dashboardGuard = canActivateDashboard('/home');
    const result = TestBed.runInInjectionContext(() =>
      dashboardGuard({} as any, {} as any)
    );
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/home']);
  });

});
