import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as moviesListActions from './movies-list.actions';
import {MoviesListService} from '../movies-list.service';

@Injectable()
export class MoviesListEffects {

    constructor(private moviesListService: MoviesListService, private actions$: Actions) {
    }

    @Effect()
    loadMoviesList$: Observable<Action> = this.actions$.pipe(
        ofType(moviesListActions.MoviesListActionTypes.Load),
        mergeMap(action =>
            this.moviesListService.getMoviesList().pipe(
                map(movies => (new moviesListActions.LoadSuccess(movies))),
                catchError(err => of(new moviesListActions.LoadFail(err)))
            )
        )
    );
}
