import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moviesListActions from '../../state/movies-list.actions';
import {select, Store} from '@ngrx/store';
import * as fromMoviesList from '../../state/';
import {LoadFilters, Movie} from '../../../movie.model';
import {Observable} from 'rxjs';

@Component({
    templateUrl: './movies-list-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListShellComponent implements OnInit {
    private filters: LoadFilters = {
        search: ''
    };
    public movies$: Observable<Movie[]>;

    constructor(private store: Store<fromMoviesList.State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new moviesListActions.Load());
        this.movies$ = this.store.pipe(select(fromMoviesList.getMoviesList));
    }

    public searchQueryChanged(query: string): void {
        this.filters.search = query;
        this.store.dispatch(new moviesListActions.LoadWithFilters(this.filters));
    }

}
