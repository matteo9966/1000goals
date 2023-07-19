import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { ProposedGoalsComponent } from './proposed-goals.component';
import { GoalCardComponent } from 'src/app/components/goal-card/goal-card.component';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  DebugElement,
} from '@angular/core';
import { GoalFormComponent } from 'src/app/components/goal-form/goal-form.component';
import { UserService } from 'src/app/services/user.service';
import { By } from '@angular/platform-browser';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';
describe('ProposedGoalsComponent', () => {
  let component: ProposedGoalsComponent;
  let fixture: ComponentFixture<ProposedGoalsComponent>;
  let debugElement: DebugElement;

  @Component({
    template: '<div>This is the stub goal Card</div>',
    standalone: true,
    selector: 'app-goal-card',
  })
  class GoalCardComponentTest {
    @Input() withAction = true;
    @Input() showPoints = true;
    @Input() goal!: any;
    @Input() actionType: 'upvote' | 'reached' = 'reached';
    @Input() reached: boolean = false;
    @Input() upvoted: boolean = false;
    @Input() isMyProposed: boolean = false;
    @Input() upvoteRatio: string = '0/0';
    @Output() clickReachedGoal = new EventEmitter<string | null>();
    @Output() clickOnGoal = new EventEmitter<string | null>();
  }

  @Component({
    template: '<div>This is the stub goal form</div>',
    selector: 'app-goal-form',
    standalone: true,
  })
  class GoalFormComponentTest {}

  @Component({
    template: '<div>This is the stub user data</div>',
    standalone: true,
    selector: 'app-goal-list',
  })
  class GoalListComponentTest {
    @Input() list: any[] = [];
    @Input() userReachedGoals: string[] = [];
    @Input() withAction: boolean = true;
    @Input() actionType: 'upvote' | 'reached' = 'reached';
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProposedGoalsComponent],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['getUserData']),
        },
      ],
    }).overrideComponent(ProposedGoalsComponent, {
      remove: {
        imports: [GoalCardComponent, GoalFormComponent, GoalListComponent],
      },
      add: {
        imports: [
          GoalCardComponentTest,
          GoalFormComponentTest,
          GoalListComponentTest,
        ],
      },
    });
    fixture = TestBed.createComponent(ProposedGoalsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges(); //run a change detection cycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two buttons "proposed goals" and "propose" ', () => {
    const buttons = debugElement.queryAll(By.css('button'));
    const btn1Text = buttons[0].nativeElement.textContent;
    const btn2Text = buttons[1].nativeElement.textContent;
    expect(btn1Text).toBe('Proposed goals');
    expect(btn2Text).toBe('Propose');
    expect(buttons.length).toBe(2);
  });

  it('should show the proposed goals list on first render',)

  it('clicking on propose shows the form template', fakeAsync(() => {
    
    
    const buttons = debugElement.queryAll(By.css('button'));
    expect(component.selected).toBe('proposed');
    buttons[1].nativeElement.click();
    flush();
    fixture.detectChanges();
    expect(component.selected).toBe('form');
    const goalForm = debugElement.query(By.directive(GoalFormComponentTest));
    expect(goalForm).toBeTruthy();
  }));
});
