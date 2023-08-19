import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseBtnComponent } from '../close-btn/close-btn.component';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
import { LogoutService } from 'src/app/services/logout.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, CloseBtnComponent, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  animations: [
    trigger('cardsAnimation', [
      transition(':enter', [
        query('.menu-item', [
          style({
            opacity: 0,
            transform:'scale(0)'
          }),
          stagger(100, [
            animate(
              200,
              style({
                opacity: 1,
                transform:'scale(1)'
              })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class UserMenuComponent {
  router = inject(Router);
  logoutService = inject(LogoutService);

  @Output() menuState: EventEmitter<boolean> = new EventEmitter();

  close() {
    this.menuState.emit(false);
  }

  navigateTo(to: string) {
    this.menuState.emit(false);
    this.router.navigateByUrl(to);
  }

  logout() {
    this.logoutService.logout();
    this.navigateTo(this.linkToHome);
  }

  //routes

  get linkToUserHome() {
    return '/' + ROUTES.user.base;
  }
  get linkToHome() {
    return '/' + ROUTES.home.base;
  }
  get linkToGoals() {
    return '/' + ROUTES.user.base + '/' + ROUTES.user.goals;
  }
  get linkToProposed() {
    return '/' + ROUTES.user.base + '/' + ROUTES.user.proposed;
  }
  get linkToLeaderboard() {
    return '/' + ROUTES.user.base + '/' + ROUTES.user.leaderboard;
  }
  get linkToMembers() {
    return '/' + ROUTES.user.base + '/' + ROUTES.user.players;
  }
}
