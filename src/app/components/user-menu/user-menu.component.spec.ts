import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { UserMenuComponent } from './user-menu.component';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { LogoutService } from 'src/app/services/logout.service';
import { Location } from '@angular/common';

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
      imports: [UserMenuComponent],
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

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should update the history',()=>{
    //TODO:::: dopo le vacanze
  })

});
