import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { calculatePoints } from 'src/app/utils/calculatePoints';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {  
  constructor(private userService:UserService){}
  get leaderboard(){
    const playersAndPoints = this.userService.getUserData()?.game?.players?.map(p=>{
      const name = p?.name || "no - name";
      const points = calculatePoints(this.userService.getUserData(),name);
      return {name,points};
    })
    return playersAndPoints?.sort((p1,p2)=>p1.points-p2.points)
  }
}
