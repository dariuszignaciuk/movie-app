import {TestBed} from '@angular/core/testing';
import {MoviesApiService} from './movies-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MoviesService} from './movies.service';

describe('MoviesApiService', () => {
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: MoviesApiService = TestBed.get(MoviesApiService);
        expect(service).toBeTruthy();
    });

    describe('getMoviesList', () => {
        it('should call get with the correct URL', () => {
            const service: MoviesService = TestBed.get(MoviesService);

            service.getMoviesList().subscribe();

            const req = httpTestingController.expectOne('/assets/json/movie.mock-data.json');
            expect(req.request.method).toBe('GET');
            req.flush([]);
            httpTestingController.verify();
        });
    });
});
