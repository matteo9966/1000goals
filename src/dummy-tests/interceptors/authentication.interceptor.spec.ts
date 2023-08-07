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
import { UserService } from '../services/user.service';
import { authenticationInterceptor } from './authentication.interceptor';

describe('authentication interceptor', () => {
  let httpClient: HttpClient;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authenticationInterceptor])),
        provideHttpClientTesting(),
        {
          provide: UserService,
          useValue: {
            sessionToken: 'test-sessiontoken',
          },
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should set the sessionToken', () => {
    httpClient.get('/test').subscribe();
    const req = controller.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
