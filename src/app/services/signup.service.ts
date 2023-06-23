import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignupAdminBody } from '1000-goals-types/src/Responses/signupAdminResponse';
import { SignupAdminRequest } from '1000-goals-types/src/Requests';
import {ROUTES} from '1000-goals-types/lib';
import { API_BASE } from '../app.config';
import { LoggerService } from './logger.service';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupURL=''
  constructor(private http:HttpClient,@Inject(API_BASE) private apiBase:string,private logger:LoggerService) { 
    this.signupURL=this.apiBase.concat(ROUTES.users.base,ROUTES.users.signupUser)
  }
  
  signup(request:SignupAdminRequest){
    this.logger.info('signup url: '+this.signupURL);
    return this.http.post<SignupAdminBody>(this.signupURL,request)
  }
}
