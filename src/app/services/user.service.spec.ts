import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { STORAGE, API_BASE } from '../app.config';
import { TestBed } from '@angular/core/testing';
import { Responses } from '1000-goals-types';
let userService: UserService;

describe('UserService', () => {
  beforeEach(() => {
    userService = {} as UserService; // clear userService
  });

  describe('setUserData', () => {
    let setItemSpy: jasmine.Spy;
    beforeEach(() => {
      setItemSpy = jasmine.createSpy();
      TestBed.configureTestingModule({
        providers: [
          {
            provide: STORAGE,
            useValue: {
              setItem: setItemSpy,
            },
          },
          {
            provide: API_BASE,
            useValue: '',
          },
          UserService,
          { provide: HttpClient, useValue: {} },
        ],
      });
    });
    it('should update the storage when passing a userData', function () {
      userService = TestBed.inject(UserService);
      userService.setUserData({
        game: null,
        user: null,
      } as unknown as Responses.LoginResponse['data']);
      expect(setItemSpy).toHaveBeenCalled();
    });
  });
});
