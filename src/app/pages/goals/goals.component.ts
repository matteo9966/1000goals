import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from 'src/app/components/goal-card/goal-card.component';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule,GoalListComponent],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {
  constructor(private userservice:UserService){}

  get goalList(){
    return this.userservice.getUserData()?.game?.goals || []
  }
}
