import {
  provideHttpClient,
  HttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { errorInterceptor } from './errorInterceptor.interceptor';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from '../services/toastr.service';

describe('errorInterceptor', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', [
            'setSowToastr',
            'setToastrType',
            'setToastrMessage',
          ]),
        },
      ],
    });

    const httpcontroller = TestBed.inject(HttpTestingController);
    const http = TestBed.inject(HttpClient);
    const toastrService = TestBed.inject(ToastrService);
    return { httpcontroller, http, toastrService };
  }

  it('should call the toastrService methods when there is an rror', () => {
    const { http, toastrService, httpcontroller } = setup();

    http.get('/error').subscribe({
      next() {
        fail();
      },
      error(error) {},
      complete() {
        expect(toastrService.setSowToastr).toHaveBeenCalledWith(true);
        expect(toastrService.setToastrType).toHaveBeenCalledWith('error');
      },
    });

    const request = httpcontroller.expectOne('/error');
    request.flush({}, { status: 401, statusText: 'test error' });
  });
});
