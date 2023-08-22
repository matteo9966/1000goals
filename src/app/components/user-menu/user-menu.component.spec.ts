import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { UserMenuComponent } from './user-menu.component';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { LogoutService } from 'src/app/services/logout.service';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  template: '<div>routed component</div>',
  selector: 'app-routed-component',
})
class RoutedComponent {}

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let debugElement: DebugElement;
  beforeEach(() => {
    let logoutServiceSpy = jasmine.createSpyObj<LogoutService>(
      'LogoutService',
      ['logout']
    );

    TestBed.configureTestingModule({
      imports: [UserMenuComponent,NoopAnimationsModule],
      providers: [
        provideRouter([{ path: '**', component: RoutedComponent }]),
        provideLocationMocks(),
        {
          provide: LogoutService,
          useValue: logoutServiceSpy,
        },
      ],
    });

    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  function clickOnKeyIcon() {
    const goalsButton = debugElement.query(
      By.css('[aria-label="goals-button"]')
    );
    goalsButton.nativeElement.click();
  }

  function advance() {
    flush();
    fixture.detectChanges();
  }

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should update the history (clicking on goals should navigate to goals)', fakeAsync(() => {
    fixture.detectChanges();
    clickOnKeyIcon(); // this should click on the key icon

    const location = TestBed.inject(Location);
    advance();
    expect(location.path()).toContain(component.linkToGoals);
  }));
});
