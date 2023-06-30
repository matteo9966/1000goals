import { Injectable, Inject } from '@angular/core';
import { Responses } from '1000-goals-types';
import { BehaviorSubject } from 'rxjs';
import { STORAGE } from '../app.config';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInSub = new BehaviorSubject(false);
  loggedIn$ = this.loggedInSub.asObservable();

  private _userData: Responses.LoginResponse['data'] | null = null;
  constructor(@Inject(STORAGE) private storage: Storage) {}

  clearUser() {
    this._userData = null;
    this.storage.clear();
    this.setLoginStatus(false);
  }

  setLoginStatus(login: boolean) {
    this.loggedInSub.next(login);
  }

  setUserData(userData: Responses.LoginResponse['data']) {
    try {
      const stringifiedData = JSON.stringify(userData);
      this.storage.setItem('userData', stringifiedData);
    } catch (error) {}
    this._userData = userData;
  }

  patchUserData(patchFn: (userData: LoginResponseBody) => LoginResponseBody) {
    try {
      const userDataCopy: LoginResponseBody = JSON.parse(
        JSON.stringify(this._userData)
      );
      const newData = patchFn(userDataCopy);
      this.setUserData(newData);
    } catch (error) {
      console.error(error);
    }
  }

  getUserData() {
    return this._userData;
  }

  isAdmin() {
    return this._userData?.user?.role === 'admin';
  }
}

