import { Component,Output,EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseBtnComponent } from '../close-btn/close-btn.component';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule,CloseBtnComponent,RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
 
  router = inject(Router);

 @Output() menuState:EventEmitter<boolean> = new EventEmitter();

 close(){
   this.menuState.emit(false)
 }

 navigateTo(to:string){
  this.menuState.emit(false);
  this.router.navigateByUrl(to);
 }


 //routes

 get linkToUserHome(){
  return '/'+ROUTES.user.base
 }
 get linkToHome(){
  return '/'+ROUTES.home
 }
 get linkToGoals(){
  return '/'+ROUTES.user.base+'/'+ROUTES.user.goals
 }
 get linkToProposed(){
  return '/'+ROUTES.user.base+'/'+ROUTES.user.proposed
 }
 get linkToLeaderboard(){
  return '/'+ROUTES.user.base+'/'+ROUTES.user.leaderboard
 }
get linkToMembers(){
  return '/'+ROUTES.user.base+'/'+ROUTES.user.players
}

}
