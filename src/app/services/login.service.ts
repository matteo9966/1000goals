import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_BASE } from '../app.config';
import { LoggerService } from './logger.service';
import {Requests,Responses} from '1000-goals-types';
import {ROUTES} from '1000-goals-types/lib';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginurl=""
  constructor(private http:HttpClient,@Inject(API_BASE) private apiBase:string,private logger:LoggerService) { 
    this.loginurl = `${this.apiBase}${ROUTES.users.base}${ROUTES.users.login}`;
  }

  login(login:Requests.LoginRequest){
    this.logger.info(`LoginURL ${login}`)
    return this.http.post<Responses.LoginResponse>(this.loginurl,login);
  }
}
