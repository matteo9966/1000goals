import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalCardComponent } from 'src/app/components/goal-card/goal-card.component';
import { GoalFormComponent } from 'src/app/components/goal-form/goal-form.component';
import { GoalListComponent } from 'src/app/components/goal-list/goal-list.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-proposed-goals',
  standalone: true,
  imports: [
    CommonModule,
    GoalCardComponent,
    GoalFormComponent,
    GoalListComponent,
  ],
  templateUrl: './proposed-goals.component.html',
  styleUrls: ['./proposed-goals.component.scss'],
})
export class ProposedGoalsComponent implements OnInit {
  constructor(private userService: UserService) {}

  private _selected: 'proposed' | 'form' = 'proposed';

  @ViewChild('proposedgoals', { read: TemplateRef, static: true })
  proposedGoalsTemplate!: TemplateRef<any>;

  @ViewChild('form', { read: TemplateRef, static: true })
  formTemplate!: TemplateRef<any>;

  showedTemplate: TemplateRef<any> | null = null;

  ngOnInit(): void {
    this.selected = 'proposed';
  }

  onClickMenu(type: 'form' | 'proposed') {
    this.selected = type;
  }

  set selected(value: 'proposed' | 'form') {
    this._selected = value;
    if (value === 'form') {
      this.showedTemplate = this.formTemplate;
      return;
    }
    if (value === 'proposed') {
      this.showedTemplate = this.proposedGoalsTemplate;
    }
  }

  get selected() {
    return this._selected;
  }

  get proposedGoalList() {
    if (this.selected === 'form') return [];
    const currentuser = this.userService.getUserData()?.user.name;
   return this.userService
      .getUserData()?.game?.proposedGoals.map((goal) => goal.goal) || [];
  }
}
