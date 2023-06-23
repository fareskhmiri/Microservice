
import { AuthManagerService } from '@services/auth/auth-manager.service';
import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpRequest, HttpParams, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '@env/environment';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@palmyra/angular-jwt-security';

const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

describe('Service: AuthManager', () => {
  const SERVICE_PATH = `${environment.basePath}/security/authenticate`;
  const mockStore = jasmine.createSpyObj('mockStore', ['dispatch']);
  const mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
  const mcokjwtHelper = jasmine.createSpyObj('mcokjwtHelper', ['']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthManagerService,
        HttpClient,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: Store,
          useValue: mockStore
      },
      {
        provide: Router,
        useValue: mockRouter
    },
     {
        provide: JwtHelperService,
        useValue: mcokjwtHelper
    }
  ]
    });
  });
  it(
    `should send an expected login request`,
    waitForAsync(
      inject(
        [AuthManagerService, HttpTestingController],
        (service: AuthManagerService, backend: HttpTestingController) => {
          service
            .authenticateUser({ username: 'foo', password: 'bar' });

          backend.expectOne((req: HttpRequest<any>) => {
            const body = new HttpParams({ fromString: req.body });
            return (
              req.url === SERVICE_PATH &&
              req.method === 'POST');
          }, `POST '${SERVICE_PATH}' with form-encoded username and password`);
        }
      )
    )
  );
  // Verifying that no requests remain outstanding
  afterEach(
    inject([HttpTestingController], (backend: HttpTestingController) => {
      backend.verify();
    })
  );
});
