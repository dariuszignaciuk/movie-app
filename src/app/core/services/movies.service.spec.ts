import {TestBed} from '@angular/core/testing';
import {MoviesService} from './movies.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MoviesService', () => {
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MoviesService,
            ]
        });
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: MoviesService = TestBed.get(MoviesService);

        expect(service).toBeTruthy();
    });

    describe('getMoviesList', () => {
        it('should call get with the correct URL', () => {
            const service: MoviesService = TestBed.get(MoviesService);

            service.getMoviesList().subscribe();

            const req = httpTestingController.expectOne('/assets/json/movie.mock-data.json');
            req.flush({});
            httpTestingController.verify();
        });
    });
});
