import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moviesListActions from '../../state/movies-list.actions';
import {select, Store} from '@ngrx/store';
import * as fromMoviesList from '../../state/';
import {Movie} from '../../../movie.model';
import {Observable} from 'rxjs';

@Component({
    templateUrl: './movies-list-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListShellComponent implements OnInit {
    movies$: Observable<Movie[]>;

    constructor(private store: Store<fromMoviesList.State>) {
    }

    ngOnInit() {
        this.store.dispatch(new moviesListActions.Load());
        this.movies$ = this.store.pipe(select(fromMoviesList.getMoviesList));
    }

}
