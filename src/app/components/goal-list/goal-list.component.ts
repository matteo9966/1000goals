import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from '../goal-card/goal-card.component';
import { Goal, ProposedGoal, User } from '1000-goals-types';
import { UserService } from 'src/app/services/user.service';
import { IsReachedPipe } from 'src/app/pipes/is-reached.pipe';
import { ToastrService } from 'src/app/services/toastr.service';
import { IsMyProposedPipe } from 'src/app/pipes/is-my-proposed.pipe';
import { UpvoteRatioPipe } from 'src/app/pipes/upvote-ratio.pipe';
import { GameService } from 'src/app/services/game.service';
import { UpvotedPipe } from 'src/app/pipes/upvoted.pipe';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [
    CommonModule,
    GoalCardComponent,
    IsReachedPipe,
    IsMyProposedPipe,
    UpvoteRatioPipe,
    UpvotedPipe
  ],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
})
export class GoalListComponent {
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private gameService: GameService
  ) {}
  @Input() list: Goal[] = [];
  @Input() userReachedGoals: string[] = [];
  @Input() withAction: boolean = true;
  @Input() actionType: 'upvote' | 'reached' = 'reached';

  private clickedReachedGoal(goalId: string | null) {
    if (!goalId) return;
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

  //check if goal with this id is mine

  // isMyProposed(goal: Goal, proposedGoals: ProposedGoal[], username: string) {
  //   // const proposedGoals = this.userService.getUserData()?.game?.proposedGoals;
  //   const proposedGoal = proposedGoals?.find((g) => g.id === goal.id);
  //   const myproposed =
  //     proposedGoal?.proposedBy === this.userService.getUserData()?.user?.name;
  //   return myproposed;
  // }

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
