import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromMovieDetails from '../state';
import * as movieDetailsActions from '../state/movie-details.actions';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {isNull, isUndefined} from 'util';

@Injectable()
export class MovieDetailsGuard implements CanActivate {
    constructor(private store: Store<fromMovieDetails.State>, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        return this.getFromStoreOrAPI()
            .pipe(
                switchMap(() => of(true)),
                catchError(() => {
                    this.router.navigate(['/']);
                    return of(false);
                })
            );
    }

    private getFromStoreOrAPI(): Observable<any> {
        return this.store
            .pipe(
                select(fromMovieDetails.getMovieDetails),
                tap((data) => {
                    if (this.movieDataNotFetchedYet(data)) {
                        this.store.dispatch(new movieDetailsActions.Load());
                    } else if (this.noMatchingMovieData(data)) {
                        throw new Error();
                    }
                }),
                filter(data => !!data),
                take(1)
            );
    }

    private movieDataNotFetchedYet(data): boolean {
        return isUndefined(data);
    }

    private noMatchingMovieData(data): boolean {
        return isNull(data);
    }
}
