import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from '../goal-card/goal-card.component';
import { Goal } from '1000-goals-types';
import { UserService } from 'src/app/services/user.service';
import { IsReachedPipe } from 'src/app/pipes/is-reached.pipe';
import { IsMyProposedPipe } from 'src/app/pipes/is-my-proposed.pipe';
import { UpvoteRatioPipe } from 'src/app/pipes/upvote-ratio.pipe';
import { GameService } from 'src/app/services/game.service';
import { UpvotedPipe } from 'src/app/pipes/upvoted.pipe';
import {
  transition,
  trigger,
  style,
  query,
  group,
  animate,
  stagger,
} from '@angular/animations';
@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [
    CommonModule,
    GoalCardComponent,
    IsReachedPipe,
    IsMyProposedPipe,
    UpvoteRatioPipe,
    UpvotedPipe,
  ],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
  animations:[
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
   
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class GoalListComponent {
  constructor(
    private userService: UserService,
    private gameService: GameService
  ) {}
  @Input() list: Goal[] = [];
  @Input() userReachedGoals: string[] = [];
  @Input() withAction: boolean = true;
  @Input() actionType: 'upvote' | 'reached' = 'reached';

  private clickedReachedGoal(goalId: string | null) {
    if (!goalId) return;
    //check if the user reachedgoals includes the goalid if it includes the goal, remove it

    if (userHasGoal(this.userReachedGoals, goalId)) {
      // this.userService REMOVE GOAL
      this.userService.removeReachedGoal(goalId).subscribe((response) => {
        const deleted = response?.data?.deleted;
        if (!deleted) {
          return;
        }
        this.userService.patchUserData((userdata) => {
          const withoutgoal = userdata.user.goals.filter((g) => g !== goalId); //remove the goal
          userdata.user.goals = withoutgoal;
          return userdata;
        });
      });
      return;
    }

    this.userService.insertReachedGoal(goalId).subscribe((response) => {
      if (!response) {
        return;
      }
      this.userService.patchUserData((userData) => {
        const user = userData.game?.players.find(
          (p) => p?.name === userData?.user?.name
        );
        if (!user) {
          return userData; // error while patching
        }
        userData.user.goals.push(goalId);
        user.goals.push(goalId);
        return userData;
      });
    });
  }

  private clickedOnUpvotedGoal(goalId: string | null) {
    if (!goalId) return;
    this.gameService.upvoteProposedGoal(goalId)?.subscribe((response) => {
      const responseData = response.data;
      this.userService.patchUserData((data) => {
        if (
          !data.game?.proposedGoals ||
          !data.game?.goals ||
          !responseData?.goals ||
          !responseData?.proposedGoals
        )
          return data;
        data.game.proposedGoals = responseData.proposedGoals;
        data.game.goals = responseData.goals;
        return data;
      });
    });
  }

  clickedOnGoal(goalId: string | null) {
    if (this.actionType === 'reached') {
      this.clickedReachedGoal(goalId);
    } else {
      this.clickedOnUpvotedGoal(goalId);
    }
  }


  get proposedGoals() {
    return this.userService.getUserData()?.game?.proposedGoals;
  }

  get username() {
    return this.userService.getUserData()?.user?.name;
  }

  get numberOfPlayers() {
    return this.userService.getUserData()?.game?.players?.length || 0;
  }
}

function userHasGoal(reachedGoals: string[] = [], goal: string) {
  return reachedGoals.includes(goal);
}
