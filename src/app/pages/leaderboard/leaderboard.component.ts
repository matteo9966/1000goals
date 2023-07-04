import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { calculatePoints } from 'src/app/utils/calculatePoints';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {  
  constructor(private userService:UserService,private router:Router){}
  get leaderboard(){
    const playersAndPoints = this.userService.getUserData()?.game?.players?.map(p=>{
      const name = p?.name || "no - name";
      const id = p?.id
      const points = calculatePoints(this.userService.getUserData(),id);
      return {name,points,id};
    })
    return playersAndPoints?.sort((p1,p2)=>p2.points-p1.points)
  }
  
  onClickUser(id:string){
    const link = this.linkToUserDetail(id);
    this.router.navigateByUrl(link);
  }
  
  linkToUserDetail(id:string){
    return '/'+[ROUTES.user.base,ROUTES.user.details].join('/').replace(':id',id);
  }
}
