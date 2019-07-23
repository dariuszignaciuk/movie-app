import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromMoviesList from '../state';
import * as moviesListActions from '../state/movies-list.actions';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable()
export class MoviesListGuard implements CanActivate {
    constructor(private store: Store<fromMoviesList.State>) {
    }

    canActivate(): Observable<boolean> {
        return this.getFromStoreOrAPI()
            .pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
    }

    private getFromStoreOrAPI(): Observable<any> {
        return this.store
            .pipe(
                select(fromMoviesList.getMoviesList),
                tap((data) => {
                    if (!data.length) {
                        this.store.dispatch(new moviesListActions.Load());
                    }
                }),
                filter(data => data.length > 0),
                take(1)
            );
    }
}
