import { canActivateCreateGameGuard } from './canActivateCreateGame.guard';
import { UserService } from '../services/user.service';
import {
  TestBed,
  ComponentFixture,
  flush,
  fakeAsync,
} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
@Component({
  providers: [],
  imports: [RouterOutlet, RouterLink],
  standalone: true,
  template: ` <a routerLink="/create-game">Create the game</a>
    <router-outlet></router-outlet>`,
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

describe('canActivateCreateGame (router testing harness)', () => {
  async function setup(user: LoginResponseBody) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: DummyRootComponent },
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
            user,
            getUserData() {
              return this.user;
            },
          },
        },
      ],
    });
    const harness = await RouterTestingHarness.create();
    const location = TestBed.inject(Location);
    function clickOnRootLink() {
      const link = harness.routeDebugElement?.query(By.css('a'))!;
      link.nativeElement.click();
    }
    function advance() {
      flush();
      harness.detectChanges();
    }

    return {
      harness,
      location,
      advance,
      clickOnRootLink,
    };
  }

  it('should not navigate if user is not ADMIN', fakeAsync(async () => {
    const userData = {
      user: {
        role: 'user',
      },
      game: {},
    } as LoginResponseBody;
    const { harness, location, advance, clickOnRootLink } = await setup(
      userData
    );
    await harness.navigateByUrl('/');
    clickOnRootLink();
    advance();
    expect(location.path())
      .withContext('the location must contain create-game in the path')
      .not.toContain('create-game');
  }));
  it('should  navigate if user is ADMIN and there is no game', fakeAsync(async () => {
    const userData = {
      user: {
        role: 'admin',
      },
      game: {},
    } as LoginResponseBody;
    const { harness, location, advance, clickOnRootLink } = await setup(
      userData
    );
    await harness.navigateByUrl('/');
    clickOnRootLink();
    advance();
    expect(location.path())
      .withContext('the location must contain create-game in the path')
      .toContain('create-game');
  }));
  
});

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

      const result = TestBed.runInInjectionContext(() =>
        canActivateCreateGameGuard({} as any, {} as any)
      );
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

      const result = TestBed.runInInjectionContext(() =>
        canActivateCreateGameGuard({} as any, {} as any)
      );
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

      const result = TestBed.runInInjectionContext(() =>
        canActivateCreateGameGuard({} as any, {} as any)
      );
      expect(result).toBeFalse();
    });
  });
});
