import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import {
  ChildrenOutletContexts,
  NavigationStart,
  PRIMARY_OUTLET,
  Router,
  RouterModule,
} from '@angular/router';
import { ROUTES } from 'src/app/routes/routes';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import {
  transition,
  trigger,
  style,
  query,
  group,
  animate,
} from '@angular/animations';
import { filter, map } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule, MainHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('pageAnimation', [
      transition('*=>*', [
        style({ position: 'relative' }),
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
              }),
              animate('0.5s', style({ opacity: 1 })),
            ],
            { optional: true }
          ),
          // query(':leave', [
          //   style({position:'absolute',inset:0}),
          //   style({ opacity: 1 }),
          //   animate('0.5s', style({ opacity: 0 })),
          // ],{optional:true}),
        ]),
      ]),
    ]),
  ],
})
export class HomeComponent {
  context: ChildrenOutletContexts;
  constructor(private router: Router) {
    this.context = inject(ChildrenOutletContexts);
    this.router.events
      .pipe(
        filter((data) => data instanceof NavigationStart),
        //i getContext twice since the route is nested and the data is in the chil of the children of the home route
        // its like context.getContext(PRIMARY) => returns the routes inside the app.component router outlet, then call children getContext again to get the context of the children
        map(() => this.context?.getContext(PRIMARY_OUTLET) || null)
      )
      .subscribe((v) => console.log(v));
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
  getRouteAnimationData() {
    return this.context?.getContext(PRIMARY_OUTLET)?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
