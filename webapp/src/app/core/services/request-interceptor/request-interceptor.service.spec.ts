
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';

import { RequestInterceptorService } from './request-interceptor.service';
import { MessagesService } from '@services/messages/message.service';
import { LoaderService } from '@app/core/components/loaders/services/loader.service';
import { Store } from '@ngrx/store';

@Injectable()
export class DataService {
    ROOT_URL = `https://sample.url.com`;

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get<any[]>(`${this.ROOT_URL}/posts`);
    }
}

describe(`Interceptor: Request Interceptor`, () => {
    let service: DataService;
    let requestInterceptorService: RequestInterceptorService;
    let httpMock: HttpTestingController;
    let mockLoaderService;
    beforeEach(() => {
        const mockMessageService = {
            openErrorMessage: jasmine.createSpy('openErrorMessage')
        };
        mockLoaderService = jasmine.createSpyObj('mockLoaderService', ['show', 'hide']);
        const mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        const mockExceptionService = jasmine.createSpyObj('mockExceptionService', ['display']);
        const mockStore = jasmine.createSpyObj('mockStore', ['dispatch']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DataService,
                {
                    provide: MessagesService,
                    useValue: mockMessageService
                },
                {
                    provide: LoaderService,
                    useValue: mockLoaderService
                },
                {
                    provide: Router,
                    useValue: mockRouter
                },
                {
                    provide: Store,
                    useValue: mockStore
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestInterceptorService,
                    multi: true,
                },
            ],
        });

        service = TestBed.inject(DataService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should add cache control header', () => {
        service.getPosts().subscribe(response => {
            expect(response).toBeTruthy();
        });
        const httpRequest = httpMock.expectOne(`${service.ROOT_URL}/posts`);
        expect(httpRequest.request.headers.has('Accept: "*/*'));
        expect(httpRequest.request.headers.has('Cache-control'));
        expect(httpRequest.request.headers.has('Expires'));
        expect(httpRequest.request.headers.has('Pragma'));
        expect(mockLoaderService.show).toHaveBeenCalled();
        expect(mockLoaderService.hide).toHaveBeenCalled();

    });

});
