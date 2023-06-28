import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from '../goal-card/goal-card.component';
import { Goal } from '1000-goals-types';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule,GoalCardComponent],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent {
 @Input() list:Goal[]=[]
}
