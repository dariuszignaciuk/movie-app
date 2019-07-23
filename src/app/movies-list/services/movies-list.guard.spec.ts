import {TestBed} from '@angular/core/testing';
import {MoviesListGuard} from './movies-list.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromMoviesList from '../state';
import {MemoizedSelector, Store} from '@ngrx/store';
import {Movie} from '../../shared/models/movie';
import {GenreType} from '../../shared/models/genre-type';

describe('MoviesListGuard', () => {
    let store: MockStore<fromMoviesList.State>;
    let getMoviesList: MemoizedSelector<fromMoviesList.State, Movie[]>;
    let movies: Movie[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MoviesListGuard,
                provideMockStore()
            ]
        });
        movies = [{
            rate: '5.1',
            genres: [GenreType.Mystery],
            length: '1h 20min',
            description: 'dummy desc',
            name: 'Dummy Title',
            img: 'src',
            key: 'dummy-title',
            id: 8
        }];
        store = TestBed.get<Store<fromMoviesList.State>>(Store);
    });

    it('should be created', () => {
        getMoviesList = store.overrideSelector(fromMoviesList.getMoviesList, movies);
        const guard: MoviesListGuard = TestBed.get(MoviesListGuard);

        expect(guard).toBeTruthy();
    });

    it('should return true if data was fetched', (done) => {
        getMoviesList = store.overrideSelector(fromMoviesList.getMoviesList, movies);
        const guard: MoviesListGuard = TestBed.get(MoviesListGuard);

        guard.canActivate().subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            done();
        });
    });

});
