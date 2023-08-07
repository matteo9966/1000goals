import {
  TestBed,
  ComponentFixture,
  flush,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserNavComponent } from './user-nav.component';
import { SpinDirective } from 'src/app/directives/spin.directive';
import { DebugElement, Component } from '@angular/core';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { NavMenuBtnComponent } from '../nav-menu-btn/nav-menu-btn.component';
import { UserService } from 'src/app/services/user.service';
import { defer } from 'rxjs';
import { RefreshResponse } from '1000-goals-types/src/Responses';

@Component({
  selector: 'app-user-menu',
  template: '<div class="the-mock-menu">mock menu</div>',
  standalone: true,
})
class UserMenuMock {}

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('UserNavComponent', () => {
  let fixture: ComponentFixture<UserNavComponent>;
  let component: UserNavComponent;
  let debugElement: DebugElement;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', [
      'refreshGame',
      'patchUserData',
    ]);
    await TestBed.configureTestingModule({
      imports: [UserNavComponent],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
    })
      .overrideComponent(UserNavComponent, {
        remove: { imports: [UserMenuComponent] },
        add: { imports: [UserMenuMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserNavComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });
  it('should create UserNavComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a nav element', () => {
    const nav = debugElement.query(By.css('nav'));
    expect(nav).toBeTruthy();
  });

  it('should have a btn-container class, clicking on it shows the app-user-menu', fakeAsync(() => {
    const btnContainer = debugElement.query(By.directive(NavMenuBtnComponent));
    expect(btnContainer).toBeDefined();

    btnContainer.nativeElement.click();
    fixture.detectChanges();
    flush();

    const userMenu = debugElement.query(By.css('.the-mock-menu'));
    expect(userMenu).toBeTruthy();
    expect(userMenu.nativeElement.textContent).toBe('mock menu'); //using the overridden component
  }));
  it('should have a refresh button', () => {
    const refreshbutton = debugElement.query(
      By.css('[aria-label="refresh-button"]')
    );
    expect(refreshbutton).toBeTruthy();
  });
  it('should update userdata when clicking on refresh', fakeAsync(() => {
    const data: any = { game: true };
    const asyncObservable = asyncData({ data: data } as RefreshResponse);
    const refreshbutton = debugElement.query(
      By.css('[aria-label="refresh-button"]')
    );

    userServiceSpy.refreshGame.and.returnValue(asyncObservable);
    //the refresh must return an observable

    refreshbutton.nativeElement.click();
    flush();
    fixture.detectChanges();
    expect(userServiceSpy.patchUserData).toHaveBeenCalledTimes(1);
  }));
});
