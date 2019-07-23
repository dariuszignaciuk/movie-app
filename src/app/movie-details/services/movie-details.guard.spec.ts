import {TestBed} from '@angular/core/testing';
import {MovieDetailsGuard} from './movie-details.guard';
import * as movieDetailsActions from '../state/movie-details.actions';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromMovieDetails from '../state';
import {MemoizedSelector, Store} from '@ngrx/store';
import {Movie} from '../../shared/models/movie';
import {GenreType} from '../../shared/models/genre-type';
import {filter} from "rxjs/operators";

describe('MovieDetailsGuard', () => {
    let store: MockStore<fromMovieDetails.State>;
    let getMovieDetails: MemoizedSelector<fromMovieDetails.State, Movie>;
    let movie: Movie;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                MovieDetailsGuard,
                provideMockStore(),
            ]
        });
        movie = {
            rate: '5.1',
            genres: [GenreType.Mystery],
            length: '1h 20min',
            description: 'dummy desc',
            name: 'Dummy Title',
            img: 'src',
            key: 'dummy-title',
            id: 8
        };
        store = TestBed.get<Store<fromMovieDetails.State>>(Store);
    });

    it('should be created', () => {
        getMovieDetails = store.overrideSelector(fromMovieDetails.getMovieDetails, movie);
        const guard: MovieDetailsGuard = TestBed.get(MovieDetailsGuard);

        expect(guard).toBeTruthy();
    });

    it('should return true if data was fetched', (done) => {
        getMovieDetails = store.overrideSelector(fromMovieDetails.getMovieDetails, movie);
        const guard: MovieDetailsGuard = TestBed.get(MovieDetailsGuard);

        guard.canActivate().subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            done();
        });
    });

    it('should return false if NO data was fetched', (done) => {
        getMovieDetails = store.overrideSelector(fromMovieDetails.getMovieDetails, null);
        const guard: MovieDetailsGuard = TestBed.get(MovieDetailsGuard);

        guard.canActivate().subscribe(canActivate => {
            expect(canActivate).toEqual(false);
            done();
        });
    });
});
