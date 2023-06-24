import { Injectable } from '@angular/core';
import { Responses } from '1000-goals-types';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInSub = new BehaviorSubject(false);
  loggedIn$ = this.loggedInSub.asObservable();

 
  userData: Responses.LoginResponse['data'] | null = null;
  constructor() {}

  clearUser(){
    this.userData=null;
    this.setLoginStatus(false)
  }
  
  setLoginStatus(login:boolean){
    this.loggedInSub.next(login);
  }

}
