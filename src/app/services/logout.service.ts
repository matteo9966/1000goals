import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private userService: UserService) {}

  logout() {
    this.userService.clearUser();
  }
}
