import { Component,Input,Output,EventEmitter } from '@angular/core';
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
@Output() clickReachedGoal= new EventEmitter<string|null>();
@Input() reached:boolean= false; 
show=false;
toggleShowDetails(){
  if(!this.reached && !this.showPoints) return
  this.show=!this.show;
}

onClickReachedGoal(){
 this.clickReachedGoal.emit(this.goal.id);
}





}



