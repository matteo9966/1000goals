import {
  TestBed,
  fakeAsync,
  flush,
  flushMicrotasks,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { GoalCardComponent } from './goal-card.component';
import { By } from '@angular/platform-browser';
import { delay, of } from 'rxjs';

describe('GoalCardComponent tests', () => {
  function setup() {
    const goalCard = new GoalCardComponent();
    return { goalCard };
  }

  function setupWFixture() {
    TestBed.configureTestingModule({
      imports: [GoalCardComponent],
    });
    const fixture = TestBed.createComponent(GoalCardComponent);
    return {
      fixture,
      component: fixture.componentInstance,
      debugComponent: fixture.debugElement,
    };
  }

  it('should start with hidden details , and the set it to show', () => {
    const { goalCard } = setup();
    expect(goalCard.show).toBe(false);
    goalCard.toggleShowDetails();
    expect(goalCard.show).toBe(true);
  });

  it('should raise an event when clicking on goal', () => {
    const { goalCard } = setup();
    goalCard.goal = {
      categories: [],
      description: '',
      id: 'id',
      name: 'goal',
      points: 20,
    };
    goalCard.clickOnGoal.subscribe((id) => {
      expect(id).toBe(goalCard.goal.id);
    });
    goalCard.onClickGoal();
  });

  it('should create the component', () => {
    const { component } = setupWFixture();
    expect(component).toBeDefined();
  });

  it('should not display any action buttons when first created', () => {
    const { fixture, component, debugComponent } = setupWFixture();
    const actionSection = debugComponent.query(By.css('.action-section'));
    expect(actionSection).toBeNull();
  });

  it('should show the action section when clicking on the card', (done) => {
    const { fixture, component, debugComponent } = setupWFixture();
    component.goal = {
      categories: [],
      description: '',
      id: 'id',
      name: 'goal',
      points: 20,
    };
    const goalCard = debugComponent.query(By.css('.goal-card'));
    expect(goalCard).toBeDefined();
    expect(component.show).toBe(false);
    (<HTMLElement>goalCard.nativeElement).click();
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.show).toBe(true);
      const actionSection = debugComponent.query(By.css('.action-section'));
      expect(actionSection).toBeDefined();
      done();
    }, 500);
  });
  it('should show the action section when clicking on the card using fakeAsync', fakeAsync(() => {
    const { fixture, component, debugComponent } = setupWFixture();
    component.goal = {
      categories: [],
      description: '',
      id: 'id',
      name: 'goal',
      points: 20,
    };

    const goalCard = debugComponent.query(By.css('.goal-card'));
    expect(goalCard).toBeDefined();
    expect(component.show).toBe(false);
    (<HTMLElement>goalCard.nativeElement).click(); //click event is a macrotask
    fixture.detectChanges();
    
    flush();
    
    expect(component.show).toBe(true);
    const actionSection = debugComponent.query(By.css('.action-section'));
    expect(actionSection).toBeDefined();

  }));

  //waitForAsync => you can make http  calls 
  //fakeAsync => does not work 

  it('should show the action section when clicking on the card using - waitForAsync', waitForAsync(() => {
    const { fixture, component, debugComponent } = setupWFixture();
    component.goal = {
      categories: [],
      description: '',
      id: 'id',
      name: 'goal',
      points: 20,
    };

    const goalCard = debugComponent.query(By.css('.goal-card'));
    expect(goalCard).toBeDefined();
    expect(component.show).toBe(false);
    (<HTMLElement>goalCard.nativeElement).click(); //click event is a macrotask
    fixture.detectChanges();
    
    //use when stable when using waitForAsync
    fixture.whenStable().then(()=>{
      expect(component.show).toBe(true);
      const actionSection = debugComponent.query(By.css('.action-section'));
      expect(actionSection).toBeDefined();
    });
    

  }));

  it('should not show any actopmsectopm if the component does not have withAction',fakeAsync(()=>{
    const { fixture, component, debugComponent } = setupWFixture();
    component.goal = {
      categories: [],
      description: '',
      id: 'id',
      name: 'goal',
      points: 20,
    };
    component.withAction = false;
    fixture.detectChanges();
    const goalCard = debugComponent.query(By.css('.goal-card'));
    expect(goalCard).toBeDefined();
    (<HTMLElement>goalCard.nativeElement).click(); //click event is a macrotask
    fixture.detectChanges();
    flush();
    const actionSection = debugComponent.query(By.css('.action-section'));
    expect(actionSection).toBeNull();
  }))





});
