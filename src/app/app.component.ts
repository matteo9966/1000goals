import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { ToastrService } from './services/toastr.service';
import { STORAGE, USERDATA_STORAGE_KEY } from './app.config';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { UserService } from './services/user.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainHeaderComponent, ToastrComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '1000goals-frontend';
  toastrService = inject(ToastrService);
  storage = inject(STORAGE);
  userService = inject(UserService)
  userDataStorageKey = inject(USERDATA_STORAGE_KEY);
  constructor() {}
  ngOnInit(): void {
    if (this.storage) {
      const user = this.storage.getItem(this.userDataStorageKey);
      if (user) {
        try {
          const userData: LoginResponseBody = JSON.parse(user);
          if (userData) {
            //lets validate the userdata before setting it
            this.userService.setUserData(userData)
          }
        } catch (error) {}
      }
    }
  }

  get toastrMessage() {
    return this.toastrService.message;
  }
  get toastrType() {
    return this.toastrService.type;
  }
  get toastrShow$() {
    return this.toastrService.showToastr$;
  }

  get userdata(){
    return this.userService.getUserData()
  }
}


