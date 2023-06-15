import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { GoalsListContainerComponent } from 'src/app/components/goals-list-container/goals-list-container.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,PieChartComponent,GoalsListContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
