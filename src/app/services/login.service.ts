import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_BASE, STORAGE } from '../app.config';
import { LoggerService } from './logger.service';
import { Requests, Responses } from '1000-goals-types';
import { ROUTES } from '1000-goals-types/lib';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginurl = '';
  constructor(
    private http: HttpClient,
    @Inject(API_BASE) private apiBase: string,
    private logger: LoggerService,
    @Inject(STORAGE) private storage: Storage
  ) {
    this.loginurl = `${this.apiBase}${ROUTES.users.base}${ROUTES.users.login}`;
  }

  login(login: Requests.LoginRequest) {
    this.logger.info(`LoginURL ${login}`);
    return this.http.post<Responses.LoginResponse>(this.loginurl, login,{observe:'response'});
  }

  /**
   * @description sets the session token in the storage, if set to null removes it from the storage
   */
  set sessionToken(token: string | null) {
    if (!token) {
      this.storage.removeItem('sessionToken');
      return;
    }
    this.storage.setItem('sessionToken', token);
  }

  get sessionToken() {
    return this.storage.getItem('sessionToken') || null;
  }
}
