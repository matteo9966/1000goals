// TEST A SUB ROUTING a component with child routes should render the child component
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import {
  TestBed,
  fakeAsync,
  flush,
  ComponentFixture,
} from '@angular/core/testing';
import {
  RouterOutlet,
  Router,
  provideRouter,
  withComponentInputBinding,
  Routes,
} from '@angular/router';
import { UserComponent } from '../pages/user/user.component';
import { provideLocationMocks } from '@angular/common/testing';
import { UserNavComponent } from '../components/user-nav/user-nav.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div aria-label="user-id">{{ id }}</div>`,
  standalone: true,
  selector: 'app-user-detail-test-component',
})
class UserDetailTestComponent {
  @Input() id: string = '';
}
@Component({
  template: ` <span aria-label="root-title">Root component</span>
    <router-outlet></router-outlet>`,
  standalone: true,
  selector: 'app-component',
  imports: [RouterOutlet],
})
class RootComponent {
  @Input() id: string = '';
}

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{ path: 'user/:id', component: UserDetailTestComponent }],
  },
];

describe('routing to a sub component', () => {
  let fixture: ComponentFixture<RootComponent>;

  function advance() {
    flush();
    fixture.detectChanges();
  }

  function setup() {
    TestBed.configureTestingModule({
      imports: [RootComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideLocationMocks(),
      ],
    }).overrideComponent(UserComponent, {
      remove: {
        imports: [UserNavComponent],
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });
    fixture = TestBed.createComponent(RootComponent);
  }

  it('should be defined', () => {
    setup();
    fixture.detectChanges();
    const appcomponentTitle = fixture.debugElement.query(
      By.css('[ aria-label="root-title"]')
    ).nativeElement.innerHTML;
    expect(appcomponentTitle).toEqual('Root component');
  });

  it('should navigate to a child route with id', fakeAsync(() => {
    setup();
    const id = 'user-id';
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    router.navigate(['user', id]);
    advance();
    const userDetail = fixture.debugElement.query(
      By.css('app-user-detail-test-component')
    );
    expect(userDetail).toBeTruthy();
    const spanContent = userDetail.nativeElement.querySelector(
      '[aria-label="user-id"]'
    ).innerHTML;
    expect(spanContent).toEqual(id);
  }));
});
