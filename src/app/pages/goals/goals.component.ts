import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from 'src/app/components/goal-card/goal-card.component';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule,GoalListComponent],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {

}
