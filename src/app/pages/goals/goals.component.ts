import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from 'src/app/components/goal-card/goal-card.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule,GoalCardComponent],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {

}
