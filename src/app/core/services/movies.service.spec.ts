import {TestBed} from '@angular/core/testing';
import {MoviesService} from './movies.service';
import {MoviesApiService} from './movies-api.service';
import {of} from 'rxjs';
import {GenreType} from '../../shared/models/genre-type';

describe('MoviesService', () => {
    let mockMoviesApiService;

    beforeEach(() => {
        mockMoviesApiService = jasmine.createSpyObj(['getMoviesList']);
        mockMoviesApiService.getMoviesList.and.returnValue(of([
            {
                rate: '5.1',
                genres: [GenreType.Mystery],
                length: '1h 20min',
                description: 'dummy desc',
                name: 'Dummy Title',
                img: 'src',
                key: 'dummy-title',
                id: 8
            },
            {
                rate: '1.8',
                genres: [GenreType.Adventure, GenreType.Crime],
                length: '2h 10min',
                description: 'mock desc',
                name: 'Mock Title',
                img: 'mock/src',
                key: 'mock-title',
                id: 5
            },
        ]));

        TestBed.configureTestingModule({
            providers: [
                MoviesService,
                {provide: MoviesApiService, useValue: mockMoviesApiService}
            ]
        });
    });

    it('should be created', () => {
        const service: MoviesService = TestBed.get(MoviesService);

        expect(service).toBeTruthy();
    });

    describe('getMoviesList', () => {
        it('should get data from stored subject and not call api service multiple times', () => {
            const service: MoviesService = TestBed.get(MoviesService);

            service.getMoviesList().subscribe();
            service.getMoviesList().subscribe();

            expect(mockMoviesApiService.getMoviesList).toHaveBeenCalledTimes(1);
        });
    });

    describe('getMovie', () => {
        it('should find movie in movieList by movie key', (done) => {
            const service: MoviesService = TestBed.get(MoviesService);

            service.getMovie('mock-title').subscribe(movie => {
                expect(movie.name).toEqual('Mock Title');
                done();
            });
        });
    });
});
