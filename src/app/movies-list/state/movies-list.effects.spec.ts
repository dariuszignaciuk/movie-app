import {TestBed} from '@angular/core/testing';
import {MoviesListEffects} from './movies-list.effects';
import {Actions} from '@ngrx/effects';
import {empty, Observable} from 'rxjs';
import {MoviesService} from '../../core/services/movies.service';
import * as moviesListActions from './movies-list.actions';
import {Movie} from '../../shared/models/movie';
import {GenreType} from '../../shared/models/genre-type';
import {cold, hot} from 'jasmine-marbles';

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

describe('MoviesListEffects', () => {
    let actions: TestActions;
    let effects: MoviesListEffects;
    let mockMoviesService;
    let movies: Movie[];

    beforeEach(() => {
        mockMoviesService = jasmine.createSpyObj(['getMoviesList']);

        TestBed.configureTestingModule({
            providers: [
                MoviesListEffects,
                {
                    provide: Actions,
                    useFactory: getActions
                },
                {
                    provide: MoviesService,
                    useValue: mockMoviesService
                }
            ]
        });
        actions = TestBed.get(Actions);
        effects = TestBed.get(MoviesListEffects);
        movies = [
            {
                rate: '5.1',
                genres: [GenreType.Drama],
                length: '1h 20min',
                description: 'dummy desc',
                name: 'Dummy title',
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
        ];
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadMoviesList$', () => {
        it('should return an LoadSuccess action, with the movies, on success', () => {
            const action = new moviesListActions.Load();
            const outcome = new moviesListActions.LoadSuccess(movies);

            actions.stream = hot('-a', {a: action});
            const response = cold('-a|', {a: movies});
            const expected = cold('--b', {b: outcome});
            mockMoviesService.getMoviesList.and.returnValue(response);

            expect(effects.loadMoviesList$).toBeObservable(expected);
        });

        it('should return an LoadFail action, with an error, on failure', () => {
            const action = new moviesListActions.Load();
            const outcome = new moviesListActions.LoadFail('error');

            actions.stream = hot('-a', {a: action});
            const response = cold('-#|', {payload: 'error'});
            const expected = cold('--b', {b: outcome});
            mockMoviesService.getMoviesList.and.returnValue(response);

            expect(effects.loadMoviesList$).toBeObservable(expected);
        });
    });
});
