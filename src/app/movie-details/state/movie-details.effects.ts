import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {catchError, concatMap, map, mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as movieDetailsActions from './movie-details.actions';
import {MovieDetailsService} from '../movie-details.service';
import * as fromRoot from '../../state';
import {Params} from '@angular/router';

@Injectable()
export class MovieDetailsEffects {

    constructor(private movieDetailsService: MovieDetailsService,
                private actions$: Actions,
                private store: Store<fromRoot.State>) {
    }

    @Effect()
    loadMovieDetails$: Observable<Action> = this.actions$.pipe(
        ofType(movieDetailsActions.MovieDetailsActionTypes.Load),
        concatMap(() => this.store.pipe(select(fromRoot.selectRouteParameters))),
        mergeMap((routeParams: Params) => {
            return this.movieDetailsService.getMovie(routeParams.key).pipe(
                map(movie => (new movieDetailsActions.LoadSuccess(movie))),
                catchError(err => of(new movieDetailsActions.LoadFail(err)))
            );
        })
    );
}
