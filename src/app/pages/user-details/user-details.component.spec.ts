import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  flush,
  fakeAsync,
} from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { UserService } from 'src/app/services/user.service';
import { PAGES_BASE } from 'src/app/app.config';
import {
  Router,
  RouterModule,
  RouterOutlet,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {
  UserDetailsComponent,
  userDetailsUtils,
} from './user-details.component';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div>
    <p>The base</p>
    <router-outlet></router-outlet>
  </div>`,
  standalone: true,
  imports: [RouterOutlet],
})
class BaseTestingComponent {}

let router: Router;
let fixture: ComponentFixture<BaseTestingComponent>;

function navigateToUserDetail(id: string) {
  router = TestBed.inject(Router); // i should get the router;
  router.navigate(['user', id]);
}

function advance() {
  flush();
  fixture.detectChanges();
}

describe('UserDetailsComponent', () => {
  function setup() {
    let userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUserData',
      'isAdmin',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [{ path: 'user/:id', component: UserDetailsComponent }],
          withComponentInputBinding()
        ),
        provideLocationMocks(),
        { provide: PAGES_BASE, useValue: '' },
        { provide: UserService, useValue: userServiceSpy },
      ],
      imports: [BaseTestingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).overrideComponent(UserDetailsComponent, {
      remove: {
        imports: [GoalListComponent, ButtonComponent],
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(BaseTestingComponent);
  }

  it('should be defined', () => {
    setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should navigate to UserDetails component and set the id and show the username', fakeAsync(() => {
    const id = 'user-id';
    const player = {
      id,
      name: 'usern-with-id',
      goals: [],
    };
    setup();
    spyOn(userDetailsUtils, 'setList').and.returnValue([]); //use spyOn to spy on an existing object
    const userServiceSpy = TestBed.inject(UserService);
    (<jasmine.Spy>userServiceSpy.getUserData).and.returnValue({
      game: {
        players: [player],
      },
    });

    fixture.detectChanges();

    navigateToUserDetail(id);
    advance();
    const userDetails = fixture.debugElement.query(By.css('app-user-details'));
    expect(userDetails).toBeTruthy();
    const usernameSpan = fixture.debugElement.query(
      By.css('[aria-label="username"]')
    );
    const username = usernameSpan.nativeElement.innerHTML;
    expect(username).toEqual(player.name);
  }));


});
