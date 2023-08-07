import { TestBed, ComponentFixture, flush,fakeAsync } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { Component, DebugElement,Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import {

  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { Location } from '@angular/common';
@Component({
  standalone: true,
  template: `<div>
    <app-user-card
      [name]="username"
      [id]="id"
      [points]="points"
    ></app-user-card>
  </div>`,
  imports: [UserCardComponent],
})
class TestCardContainerComponent {
  username = 'giannis';
  id = 'giannis-id';
  points = 20;
}
@Component({
  standalone: true,
  template: `<div class='routed'>{{id}}</div>`,
})
class RoutedComponent {
 @Input() id:string|null=null;
}

describe('UserCardComponent', () => {
  let component: TestCardContainerComponent;
  let fixture: ComponentFixture<TestCardContainerComponent>;
  let debugElement: DebugElement;
  let harness:RouterTestingHarness;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestCardContainerComponent],
      providers: [
        provideRouter(
          [
            {
              path: [ROUTES.user.base, ROUTES.user.details].join('/'),
              component: RoutedComponent,
            },
          ],
          withComponentInputBinding()
        ),
        provideLocationMocks()
      ],
    });

    fixture = TestBed.createComponent(TestCardContainerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    harness = await RouterTestingHarness.create();
});

  it('should have a defined user card', () => {
    fixture.detectChanges();
    const userCard = debugElement.query(By.css('.user-card'));
    expect(userCard).toBeDefined();
  });

  it('should display name and points of the user', () => {
    fixture.detectChanges();
    const userCard = debugElement.query(By.css('.user-card'));
    const nameSpan = userCard.nativeElement.querySelector('.name');
    const pointsSpan = userCard.nativeElement.querySelector('.points');
    expect(nameSpan.innerHTML).toBe(component.username);
    expect(pointsSpan.innerHTML).toBe(String(component.points));
  });

  it('should navigate to userDetail with id in urlParam', fakeAsync(() => {
   fixture.detectChanges();
   const userCard = debugElement.query(By.css('.user-card'));
   const a = userCard.nativeElement.querySelector('a');
   expect(a).toBeTruthy();
   a.click();
   flush();
   fixture.detectChanges();
   const location = TestBed.inject(Location);
   expect(location.path()).toBe('/user/details/giannis-id')
  }));

  
});


