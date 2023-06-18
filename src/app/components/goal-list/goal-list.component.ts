import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from '../goal-card/goal-card.component';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule,GoalCardComponent],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent {

}
