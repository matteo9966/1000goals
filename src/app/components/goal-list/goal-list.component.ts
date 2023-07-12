import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from '../goal-card/goal-card.component';
import { Goal, User } from '1000-goals-types';
import { UserService } from 'src/app/services/user.service';
import { IsReachedPipe } from 'src/app/pipes/is-reached.pipe';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule, GoalCardComponent,IsReachedPipe],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
})
export class GoalListComponent {
  constructor(private userService: UserService,private toastrService:ToastrService) {}
  @Input() list: Goal[] = [];
  @Input() userReachedGoals:string[]=[];
  @Input() withAction:boolean=true;
  @Input() actionType:'upvote' | 'reached' = 'reached';
  
 private clickedReachedGoal(goalId: string | null) {
    if (!goalId) return;
    this.userService.insertReachedGoal(goalId).subscribe((response) => {
      if (!response) {
        // this.toastrService.setSowToastr(true)
        // this.toastrService.setToastrMessage('Error while inserting the goal')
        return
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

  clickedOnGoal(goalId:string|null){
    if(this.actionType==='reached'){
      this.clickedReachedGoal(goalId)
    }else{

    }
  }

}
