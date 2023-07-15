import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuBtnComponent } from '../nav-menu-btn/nav-menu-btn.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { UserService } from 'src/app/services/user.service';
import { SpinDirective } from 'src/app/directives/spin.directive';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [CommonModule, NavMenuBtnComponent, UserMenuComponent,SpinDirective],
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss'],
})
export class UserNavComponent {
  openMenu: boolean = false;

   constructor(private userService:UserService){
   }

  onClickOpen(){
    this.openMenu = !this.openMenu;
  }

  get name(){
    return this.userService.getUserData()?.user?.name || "not-logged-in";
  }
  
}
