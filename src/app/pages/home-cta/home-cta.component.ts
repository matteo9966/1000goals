import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule],
  templateUrl: './home-cta.component.html',
  styleUrls: ['./home-cta.component.scss']
})
export class HomeCtaComponent {
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
