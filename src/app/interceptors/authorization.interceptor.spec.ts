import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { authorizationInterceptor } from './authorization.interceptor';
import { LoginService } from '../services/login.service';

const MOCKROUTES = {
  withtoken: '/needs-sessiontoken',
  notoken: '/doesnt-need-sessiontoken',
};

describe('authorization interceptor', () => {
  let httpClient: HttpClient;
  let controller: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([authorizationInterceptor([MOCKROUTES.withtoken])])
        ),
        provideHttpClientTesting(),
        {
          provide:LoginService,
          useValue: {
            sessionToken: 'bearer sessiontoken',
          }
        }
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should not add session token to requests that do not need it', () => {
    httpClient.get(MOCKROUTES.notoken).subscribe();
    const req = controller.expectOne(MOCKROUTES.notoken);
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should add session token to request that is part of the configuration array if the interceptor',()=>{
    httpClient.get(MOCKROUTES.withtoken).subscribe();
    const request = controller.expectOne(MOCKROUTES.withtoken);
    const authHeader = request.request.headers.get('Authorization');
    expect(authHeader).toBeDefined();
    expect(authHeader).toContain('bearer')
    expect(authHeader).toContain('sessiontoken')
    request.flush({}, { status: 200, statusText: 'OK' }); 
   
  })
});
