import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuBtnComponent } from '../nav-menu-btn/nav-menu-btn.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [CommonModule, NavMenuBtnComponent, UserMenuComponent],
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss'],
})
export class UserNavComponent {
  openMenu: boolean = false;

  onClickOpen(){
    this.openMenu = !this.openMenu;
  }
  
}
