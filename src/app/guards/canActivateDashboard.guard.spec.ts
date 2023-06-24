import { LoginResponse } from '1000-goals-types/src/Responses';
import { UserService } from '../services/user.service';
import { canActivateDashboard } from './canActivateDashboard.guard';
import { TestBed } from '@angular/core/testing';

const mockUser = {
  user: {
    gameID: 'game-id',
    role: 'admin',
  },
} as unknown as LoginResponse['data'];
describe('canActivateDashboardGuard', () => {
  const mockUserService = jasmine.createSpyObj<UserService>('userService', [], {
    userData: mockUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    });
  });

  it('should have defined userData', () => {
    const userservice = TestBed.inject(UserService);
    expect(userservice.userData?.user.gameID).toBe('game-id');
    expect(userservice.userData?.user.role).toBe('admin');
  });
});
