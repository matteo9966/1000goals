import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule,MainHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  onClickLogin() {
    this.router.navigateByUrl(
      '/' + [ROUTES.home.base, ROUTES.home.login].join('/')
    );
  }
  onClickSignup() {
    this.router.navigateByUrl(
      '/' + [ROUTES.home.base, ROUTES.home.signup].join('/')
    );
  }
}
