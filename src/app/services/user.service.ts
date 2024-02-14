import { Injectable, Inject } from '@angular/core';
import { Requests, Responses } from '1000-goals-types';
import { BehaviorSubject, EMPTY, tap } from 'rxjs';
import { STORAGE } from '../app.config';
import { LoginResponseBody } from '1000-goals-types/src/Responses/loginResponse';
import { HttpClient } from '@angular/common/http';
import { ROUTES } from '1000-goals-types/lib';
import { API_BASE } from '../app.config';
import { changePasswordRequest } from '1000-goals-types/src/Requests';
import { ChangePasswordResponse } from '1000-goals-types/src/Responses';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInSub = new BehaviorSubject(false);
  loggedIn$ = this.loggedInSub.asObservable();
  private insertReachedGoalURL = '';
  private changePasswordURL = '';
  private refreshURL = '';

  private _userData: Responses.LoginResponse['data'] | null = null;
  constructor(
    @Inject(STORAGE) private storage: Storage,
    private http: HttpClient,
    @Inject(API_BASE) private apiBase: string
  ) {
    this.insertReachedGoalURL = `${this.apiBase}${ROUTES.users.base}${ROUTES.users.reachedGoal}`;
    this.changePasswordURL = `${this.apiBase}${ROUTES.users.base}${ROUTES.users.changePassword}`; //TODO: update dei routes package
    this.refreshURL = `${this.apiBase}${ROUTES.users.base}/refresh/:id`; //TODO: replace
  }

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
    } catch (error) {
      console.log(error);
    }
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

  insertReachedGoal(goalId: string) {
    const gameid = this.getUserData()?.game?.id;
    const name = this.getUserData()?.user.name;
    if (!gameid || !name) {
      return EMPTY;
    }

    const request: Requests.insertReachedGoalRequest = {
      gameId: gameid,
      goalId: goalId,
      name: name,
    };

    return this.http.patch<Responses.InsertReachedGoalResponse>(
      this.insertReachedGoalURL,
      request
    );
  }

  removeReachedGoal(goalId: string) {
    const gameId = this.getUserData()?.game?.id;
    const name = this.getUserData()?.user?.name;
    if (!gameId || !name) {
      return EMPTY;
    }

    const request: Requests.insertReachedGoalRequest = {
      gameId: gameId,
      goalId: goalId,
      name: name,
    };

    return this.http.delete<
      Responses.InsertReachedGoalResponse & { data: { deleted: boolean } }
    >(this.insertReachedGoalURL, {
      body: request,
    });
  }

  changePassword(password: string, username: string) {
    const changePasswordRequest: changePasswordRequest = {
      newPassword: password,
      username,
    };
    return this.http
      .patch<ChangePasswordResponse>(
        this.changePasswordURL,
        changePasswordRequest
      )
      .pipe(
        tap((response) => {
          if (response.data && response.data?.changed) {
            this.patchUserData((userdata) => {
              if (userdata?.user?.tempPassword) {
                delete userdata.user.tempPassword;
              }
              return userdata;
            });
          }
        })
      );
  }

  refreshGame() {
    const gameId = this.getUserData()?.game?.id;

    if (!gameId) return;
    const refreshurl = this.refreshURL.replace(':id', gameId);
    return this.http.get<Responses.RefreshResponse>(refreshurl);
  }
}
