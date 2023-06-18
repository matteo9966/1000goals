import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,GoalListComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
 selectedList:'goals'|'proposed'='goals';
}
