import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Goal } from '1000-goals-types';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-goal-card',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent {
@Input() withAction=true; // the action is showing the button, this button adds the goal to the reached goal list
@Input() showPoints=true;
@Input() goal!:Goal;
show=false;
toggleShowDetails(){
  this.show=!this.show;
}

onClickReachedGoal(){
  //user clicks on reached goal and saves this goalid in he's array of reached goals
}

}
