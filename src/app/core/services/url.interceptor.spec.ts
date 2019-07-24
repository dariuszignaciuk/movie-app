import {TestBed} from '@angular/core/testing';
import {UrlInterceptor} from './url.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MoviesApiService} from './movies-api.service';
import {environment} from '../../../environments/environment';

describe('UrlInterceptor', () => {
    let service: MoviesApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MoviesApiService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: UrlInterceptor,
                    multi: true,
                },
            ],
        });
        service = TestBed.get(MoviesApiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should prepend base api url', () => {
        service.getMoviesList().subscribe();

        const httpRequest = httpMock.expectOne(`${environment.apiConfig.url}movie.mock-data.json`);
        expect(httpRequest.request.url).toContain(environment.apiConfig.url);
        httpMock.verify();
    });
});
