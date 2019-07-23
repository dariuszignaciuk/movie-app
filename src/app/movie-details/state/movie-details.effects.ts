import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as movieDetailsActions from './movie-details.actions';
import * as fromRoot from '../../state';
import {Params} from '@angular/router';
import {MoviesService} from '../../core/services/movies.service';

@Injectable()
export class MovieDetailsEffects {

    constructor(private moviesService: MoviesService,
                private actions$: Actions,
                private store: Store<fromRoot.State>) {
    }

    @Effect()
    loadMovieDetails$: Observable<Action> = this.actions$.pipe(
        ofType(movieDetailsActions.MovieDetailsActionTypes.Load),
        switchMap(() => this.store.pipe(select(fromRoot.selectRouteParameters))),
        switchMap((routeParams: Params) => {
            return this.moviesService.getMovie(routeParams.key).pipe(
                map(movie => {
                    if (movie) {
                        return new movieDetailsActions.LoadSuccess(movie);
                    } else {
                        return new movieDetailsActions.LoadFail('No results found');
                    }
                }),
                catchError(err => of(new movieDetailsActions.LoadFail(err)))
            );
        })
    );
}
