import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { AdminAddUserFormComponent } from 'src/app/components/admin-add-user-form/admin-add-user-form.component';
import { UserService } from 'src/app/services/user.service';
import { PointsPipe } from 'src/app/pipes/pointsPipe.pipe';

@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [CommonModule,UserCardComponent,AdminAddUserFormComponent,PointsPipe],
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent {
 constructor(private userService:UserService){

 }

 get memberList(){
  return this.userService.getUserData()?.game?.players || [];
 }

 get userData(){
  return this.userService.getUserData()
 }

 get isAdmin(){
  return this.userService.isAdmin()
 }


}
