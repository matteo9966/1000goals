import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Goal } from '1000-goals-types';
import { ButtonComponent } from '../button/button.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-goal-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
  animations: [
    trigger('showAction', [
      transition(':enter', [
        style({ maxHeight: '0px' }),
        animate(200, style({ maxHeight: '200px' })),
      ]),
      transition(':leave', [
        style({ maxHeight: '200px' }),
        animate(200, style({ maxHeight: '0px' })),
      ]),
    ]),
  ],
})
export class GoalCardComponent implements OnInit {
  @Input() withAction = true; // the action is showing the button, this button adds the goal to the reached goal list
  @Input() showPoints = true;
  @Input() goal!: Goal;
  @Input() actionType: 'upvote' | 'reached' = 'reached';
  @Input() reached: boolean = false;
  @Input() upvoted: boolean = false; //upvoted so don't show
  @Input() isMyProposed: boolean = false;
  @Input() upvoteRatio: string = '0/0'; //this is the ratio of number of votes / number of players in the game
  @Output() clickOnGoal = new EventEmitter<string | null>();
  @ViewChild('buttoncontainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('reachedgoal', { read: TemplateRef, static: true })
  reachedGoalBtnTemplate!: TemplateRef<any>;
  @ViewChild('upvote', { read: TemplateRef, static: true })
  upvoteBtnTemplate!: TemplateRef<any>;

  show = false;
  toggleShowDetails() {
    if (!this.reached && !this.showPoints) return;
    this.show = !this.show;
  }

  onClickGoal() {
    this.clickOnGoal.emit(this.goal.id);
  }

  ngOnInit(): void {
    if (!this.container) {
      return;
    }
    if (this.actionType === 'upvote') {
      this.container.clear();
      this.container.createEmbeddedView(this.upvoteBtnTemplate);
      return;
    }
    if (this.actionType == 'reached') {
      this.container.clear();
      this.container.createEmbeddedView(this.reachedGoalBtnTemplate);
    }
  }

  get isUpvote() {
    return this.actionType === 'upvote';
  }
}
