import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { GoalsListContainerComponent } from 'src/app/components/goals-list-container/goals-list-container.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PieChartComponent, GoalsListContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private userservice: UserService) {}
  ngOnInit(): void {
    this.userservice.getUserData()?.user?.goals?.length || 0;
  }

  get numberOfReachedGoals() {
    return this.userservice.getUserData()?.user?.goals?.length || 0;
  }
  get points() {
    //the game data has the id of the games
    const pnts=  this.userservice.getUserData()?.user.goals
      .map((g) => {
        const gameGoals = this.userservice.getUserData()?.game?.goals;
        const goal = gameGoals?.find((game) => game?.id === g);
        return goal?.points;
      })
      .filter((g) => !!g)
      .reduce((sum, current) => {
        return sum! + current!;
      }, 0);

      return pnts
  }


}
