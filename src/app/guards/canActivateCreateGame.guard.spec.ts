import { canActivateCreateGameGuard } from './canActivateCreateGame.guard';
import { UserService } from '../services/user.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

@Component({
  providers: [],
  imports: [RouterOutlet],
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  selector: 'app-dummy-root',
})
class DummyRootComponent {}

@Component({
  providers: [],
  imports: [],
  standalone: true,
  template: `<div>This Is the create Game Component</div>`,
  selector: 'app-create-game',
})
class CreateGameComponentTest {}

describe('canActivateCreateGame (integrated)', () => {
  let fixture: ComponentFixture<DummyRootComponent>;
  function setupTest(userData: LoginResponseBody) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'create-game',
            component: CreateGameComponentTest,
            canActivate: [canActivateCreateGameGuard],
          },
        ]),
        provideLocationMocks(),
        {
          provide: UserService,
          useValue: {
            getUserData() {
              return userData;
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DummyRootComponent);
  }

  it('should not navigate if user is not admin', async () => {
    const user = {
      user: {
        role: 'user',
      },
      game: {},
    } as unknown as LoginResponseBody;

    setupTest(user);
    const router = TestBed.inject(Router);

    const navigation = await router.navigate(['create-game']);
    expect(navigation).toBeFalse();
  });

  it('should navigate ifuser is admin and has no game', async () => {
    const user = {
      user: {
        role: 'admin',
      },
      game: {},
    } as unknown as LoginResponseBody;
    setupTest(user);
    const router = TestBed.inject(Router);
    const navigation = await router.navigate(['create-game']); //trigger the navigation
    expect(navigation).toBeTrue();
  });
});

describe('canActivateCreateGameGuard (shallow)', () => {
  function setupTest(userData: LoginResponseBody) {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserData() {
              return userData;
            },
          },
        },
      ],
    });
  }

  describe('User is Admin', () => {
    it('should return true if there is no game', () => {
      const data = {
        user: {
          role: 'admin',
        },
        game: {
          id: null,
        },
      } as unknown as LoginResponseBody;
      setupTest(data);

      const result = TestBed.runInInjectionContext(()=>canActivateCreateGameGuard({} as any, {} as any));
      expect(result).toBeTrue();
    });
    it('should return false if there is a game', () => {
      const data = {
        user: {
          role: 'admin',
        },
        game: {
          id: 'some-valid-id',
        },
      } as unknown as LoginResponseBody;
      setupTest(data);

      const result = TestBed.runInInjectionContext(()=>canActivateCreateGameGuard({} as any, {} as any));
      expect(result).toBeFalse();
    });
  });

  describe('User is NOT Admin', () => {
    it('should return false if user Is not admin', () => {
      const data = {
        user: {
          role: 'user',
        },
        game: {
          id: null,
        },
      } as unknown as LoginResponseBody;
      setupTest(data);

      const result = TestBed.runInInjectionContext(()=>canActivateCreateGameGuard({} as any, {} as any));
      expect(result).toBeFalse();
    });
  });
});
