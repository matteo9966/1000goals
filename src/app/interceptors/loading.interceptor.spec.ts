import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { loadingInterceptor } from './loading.interceptor';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from '../services/loading.service';

describe('loadingInterceptor Tests', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
        {
          provide: LoadingService,
          useValue: jasmine.createSpyObj('LoadingService', ['setShowLoader']),
        },
      ],
    });
    //  The test uses the HttpTestingController to find out about pending HTTP requests and to specify the HTTP responses to be simulated:
    const testController = TestBed.inject(HttpTestingController);
    const client = TestBed.inject(HttpClient);
    return { testController, client };
  }

  it('should show the loading spinner on a call', () => {
    const { testController, client } = setup();
    const loaderService = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;
    const body = {
      data: 'somedata',
    };
    client.get('/test').subscribe((response) => {
      expect(response).toBeDefined();
      expect(loaderService.setShowLoader).toHaveBeenCalledWith(true);

    });
     //TODO: how to use fake asyncs !! 
    const request = testController.expectOne('/test');
    request.flush(body);
  });
});
