import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChildrenOutletContexts,
  NavigationEnd,
  NavigationStart,
  PRIMARY_OUTLET,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { ToastrService } from './services/toastr.service';
import { STORAGE, USERDATA_STORAGE_KEY } from './app.config';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { UserService } from './services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingService } from './services/loading.service';
import { filter, map, Observable } from 'rxjs';
import { transition, trigger,style, query, group, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainHeaderComponent,
    ToastrComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    // trigger('pageAnimation',[
    //   transition('*=>*',[
    //     style({position:'relative'}),
    //     query(':enter,:leave',[
    //       style({
    //         position:'absolute',
    //         top:0,
    //         left:0,
    //         width:'100%'
    //       }),
    //       query(':enter',[
    //         style({
    //           left:'-100%'
    //         }),
    //         // query(':leave',[
    //         // ])
    //         group([
    //           query(':leave',[
    //             animate('400ms ease-out',style({left:'100%'}))
    //           ]),
    //           query(':enter',[
    //             animate('400ms ease-out',style({left:'0%'}))
    //           ])
    //         ])

    //       ])
    //     ])
    //   ])
    // ])
  ]
})
export class AppComponent implements OnInit {
  title = '1000goals-frontend';
  toastrService = inject(ToastrService);
  storage = inject(STORAGE);
  userService = inject(UserService);
  userDataStorageKey = inject(USERDATA_STORAGE_KEY);
  loadingService = inject(LoadingService);
  context = inject(ChildrenOutletContexts);
  router = inject(Router);
  animationData$!:Observable<string>;
  constructor() {
   this.animationData$ =  this.router.events
      .pipe(
        filter((data) => data instanceof NavigationStart),
        //i getContext twice since the route is nested and the data is in the chil of the children of the home route
        // its like context.getContext(PRIMARY) => returns the routes inside the app.component router outlet, then call children getContext again to get the context of the children
        map(
          () =>
            this.context
              .getContext(PRIMARY_OUTLET)
              ?.children?.getContext(PRIMARY_OUTLET)?.route?.snapshot?.data?.[
              'animation'
            ] || null
        )
      )
  }
  ngOnInit(): void {
    if (this.storage) {
      const user = this.storage.getItem(this.userDataStorageKey);
      if (user) {
        try {
          const userData: LoginResponseBody = JSON.parse(user);
          if (userData) {
            //lets validate the userdata before setting it
            this.userService.setUserData(userData);
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

  get userdata() {
    return this.userService.getUserData();
  }

  getRouteAnimationData(){
    return this.context
    .getContext(PRIMARY_OUTLET)
    ?.children?.getContext(PRIMARY_OUTLET)?.route?.snapshot?.data?.[
    'animation'
  ] 
  }
}
