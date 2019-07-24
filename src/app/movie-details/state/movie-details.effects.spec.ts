import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {empty, Observable} from 'rxjs';
import {MoviesService} from '../../core/services/movies.service';
import * as movieDetailsActions from './movie-details.actions';
import {Movie} from '../../shared/models/movie';
import {GenreType} from '../../shared/models/genre-type';
import {cold, hot} from 'jasmine-marbles';
import {MovieDetailsEffects} from './movie-details.effects';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromRoot from '../../state';
import {MemoizedSelector, Store} from '@ngrx/store';
import {Params} from '@angular/router';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('MovieDetailsEffects', () => {
    let actions: TestActions;
    let effects: MovieDetailsEffects;
    let mockMoviesService;
    let movie: Movie;
    let store: MockStore<fromRoot.State>;
    let selectRouteParameters: MemoizedSelector<fromRoot.State, Params>;

    beforeEach(() => {
        mockMoviesService = jasmine.createSpyObj(['getMovie']);

        TestBed.configureTestingModule({
            providers: [
                MovieDetailsEffects,
                {
                    provide: Actions,
                    useFactory: getActions
                },
                {
                    provide: MoviesService,
                    useValue: mockMoviesService
                },
                provideMockStore(),
            ]
        });
        actions = TestBed.get(Actions);
        effects = TestBed.get(MovieDetailsEffects);
        store = TestBed.get<Store<fromRoot.State>>(Store);
        selectRouteParameters = store.overrideSelector(fromRoot.selectRouteParameters, {key: 'test'});
        movie = {
            rate: '5.1',
            genres: [GenreType.Drama],
            length: '1h 20min',
            description: 'dummy desc',
            name: 'Dummy title',
            img: 'src',
            key: 'dummy-title',
            id: 8
        };
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadMovieDetails$', () => {
        it('should return an LoadSuccess action, with the movie details, on success', () => {
            const action = new movieDetailsActions.Load();
            const outcome = new movieDetailsActions.LoadSuccess(movie);

            actions.stream = hot('-a', {a: action});
            const response = cold('-a|', {a: movie});
            const expected = cold('--b', {b: outcome});
            mockMoviesService.getMovie.and.returnValue(response);

            expect(effects.loadMovieDetails$).toBeObservable(expected);
        });

        it('should return an LoadFail action, with an error, on failure', () => {
            const action = new movieDetailsActions.Load();
            const outcome = new movieDetailsActions.LoadFail('error');

            actions.stream = hot('-a', {a: action});
            const response = cold('-#|', {payload: 'error'});
            const expected = cold('--b', {b: outcome});
            mockMoviesService.getMovie.and.returnValue(response);

            expect(effects.loadMovieDetails$).toBeObservable(expected);
        });
    });
});
