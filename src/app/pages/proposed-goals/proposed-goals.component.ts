import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from 'src/app/components/goal-card/goal-card.component';

@Component({
  selector: 'app-proposed-goals',
  standalone: true,
  imports: [CommonModule,GoalCardComponent],
  templateUrl: './proposed-goals.component.html',
  styleUrls: ['./proposed-goals.component.scss']
})
export class ProposedGoalsComponent {
 //TODO: add a like badge or dislike badge like accepted or refused 
}
