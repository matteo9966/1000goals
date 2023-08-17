import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule],
  templateUrl: './home-cta.component.html',
  styleUrls: ['./home-cta.component.scss'],
  animations: [
    trigger('listButtons', [
      transition('*=>*', [
        query(':enter', [
          style({
            opacity: 0,
          }),
          stagger(300, [animate('0.5s', style({ opacity: 1 }))]),
        ],{optional:true}),

      ]),
    ]),
  ],
})
export class HomeCtaComponent {
  buttons:any[]=[]
  constructor(private router: Router) {
    const onClickLogin = this.onClickLogin.bind(this);
    const onClickSignup = this.onClickSignup.bind(this);

    this.buttons = [
      { label: 'Login', action: onClickLogin },
      { label: 'Signup', action: onClickSignup },
    ];

  }
 
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
