import { UserService } from 'src/app/services/user.service';
import { GoalListComponent } from './goal-list.component';
import { TestBed } from '@angular/core/testing';
import { GameService } from 'src/app/services/game.service';
import { By } from '@angular/platform-browser';
import { GoalCardComponent } from '../goal-card/goal-card.component';

describe('goal-list.component tests', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [GoalListComponent, GoalCardComponent],
      declarations: [],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', [
            'removeReachedGoal',
            'patchUserData',
            'insertReachedGoal',
            'getUserData',
          ]),
        },
        {
          provide: GameService,
          useValue: jasmine.createSpyObj('GameService', ['upvoteProposedGoal']),
        },
      ],
    });

    const fixture = TestBed.createComponent(GoalListComponent);
    const component = fixture.componentInstance;
    const debugComponent = fixture.debugElement;

    return { fixture, component, debugComponent };
  }

  it('should be defined', () => {
    const { component } = setup();
    expect(component).toBeDefined();
  });

  it('shows "Nothing to show" if the course list is empty', () => {
    const { fixture, component, debugComponent } = setup();

    component.list = []; // empty list
    fixture.detectChanges();

    const emptyTabPar = debugComponent.query(By.css('p'));
    const textContent = (<HTMLParagraphElement>emptyTabPar.nativeElement)
      .textContent;
    expect(emptyTabPar).toBeDefined();
    expect(textContent).toBe('Nothing to show');
  });

  it('shows a goal list element if the length of goals is > 0', () => {
    const { fixture, component, debugComponent } = setup();
    component.list = [
      { categories: [], description: 'a', id: '1', name: 'n', points: 20 },
      { categories: [], description: 'b', id: '2', name: 'name', points: 20 },
      { categories: [], description: 'c', id: '3', name: 'name', points: 20 },
    ];
    fixture.detectChanges();
    const appgoalCardList = debugComponent.queryAll(
      By.directive(GoalCardComponent)
    );
    expect(appgoalCardList.length).toBe(3);
  });
});
