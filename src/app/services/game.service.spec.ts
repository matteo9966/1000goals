import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { ToastrService } from './toastr.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_BASE } from '../app.config';
import { Requests, User } from '1000-goals-types';
import { Observable } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { InsertGameResponse } from '1000-goals-types/src/Responses';
import { GameLookupPlayers } from '1000-goals-types/src/Game.interface';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';

describe('GameService', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [
        GameService,
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['getUserData']),
        },
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', [
            'setToastrType',
            'setToastrMessage',
            'setSowToastr',
          ]),
        },
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get']),
        },
        {
          provide: API_BASE,
          useValue: 'api-base',
        },
      ],
    });

    const gameService = TestBed.inject(GameService);
    const toastrService = TestBed.inject(ToastrService);
    return { gameService, toastrService };
  }

  it('should show a toaster if there is no username (user is not logged in)', function () {
    const { gameService, toastrService } = setup();
    const toastrServiceSpy = <jasmine.SpyObj<ToastrService>>toastrService;
    const result = gameService.createGame(
      {} as Requests.InsertGameRequest['game']
    );

    expect(toastrServiceSpy.setToastrType).toHaveBeenCalledWith('error');
    expect(toastrServiceSpy.setSowToastr).toHaveBeenCalledOnceWith(true);
    expect(result).toBeInstanceOf(Observable);
  });

  describe('HttpClient testing', () => {
    function setup() {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          GameService,
          {
            provide: UserService,
            useValue: jasmine.createSpyObj('UserService', ['getUserData']),
          },
          {
            provide: ToastrService,
            useValue: jasmine.createSpyObj('ToastrService', [
              'setToastrType',
              'setToastrMessage',
              'setSowToastr',
            ]),
          },
          {
            provide: API_BASE,
            useValue: 'api-base',
          },
        ],
      });

      const httpTestingController = TestBed.inject(HttpTestingController);
      return { httpTestingController };
    }

    it('tests the POST method', () => {
      const { httpTestingController } = setup();

      const gameService = TestBed.inject(GameService);
      const userService = TestBed.inject(
        UserService
      ) as unknown as jasmine.SpyObj<UserService>;
      const user = { user: { name: 'username' } } as unknown as Omit<
        User,
        'password'
      >;
      userService.getUserData.and.returnValues(user as unknown as LoginResponseBody)

      const responseData: InsertGameResponse = {
        data: {} as InsertGameResponse['data'],
        error: null,
      };

      gameService
        .createGame({
          description: 'game description',
          name: 'game name',
        } as Requests.InsertGameRequest['game'])
        .subscribe((response) => {
          expect(response).toEqual(responseData);
        });

      const request = httpTestingController.expectOne(
        gameService.createGameURL
      );
      request.flush(responseData);
      httpTestingController.verify();
    });


  });
});
