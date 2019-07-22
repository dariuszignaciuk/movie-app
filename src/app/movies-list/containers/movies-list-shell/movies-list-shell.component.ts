import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moviesListActions from '../../state/movies-list.actions';
import {select, Store} from '@ngrx/store';
import * as fromMoviesList from '../../state/';
import * as fromRoot from '../../../state';
import {combineLatest, Observable} from 'rxjs';
import {Movie} from '../../../shared/models/movie';
import {GenreType} from '../../../shared/models/genre-type';
import {MoviesFilter} from '../../models/movies-filter';
import {GenreSelectItem} from '../../models/genre-select-item';
import {take} from 'rxjs/operators';
import {Params, Router} from '@angular/router';
import {GenresHelper} from '../../../shared/utils/genres-helper';

@Component({
    templateUrl: './movies-list-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListShellComponent implements OnInit {
    public movies$: Observable<Movie[]>;
    public genresList: GenreSelectItem[] = GenresHelper.createGenreFilterList();
    public filters: MoviesFilter = {
        search: null,
        genre: null
    };

    constructor(private store: Store<fromMoviesList.State>, private router: Router) {
    }

    ngOnInit(): void {
        this.store.dispatch(new moviesListActions.Load());
        this.setInitialFilters();
        this.movies$ = this.store.pipe(select(fromMoviesList.getFilteredList));
    }

    public searchQueryChanged(search: string): void {
        this.filters = {
            ...this.filters,
            search
        };
        this.dispatchFiltersChangeAction();
    }

    public genreFilterChanged(genre: GenreType): void {
        this.filters = {
            ...this.filters,
            genre
        };
        this.dispatchFiltersChangeAction();
    }

    private dispatchFiltersChangeAction(): void {
        this.router.navigate(['/'], {queryParams: this.buildQueryParams()});
        this.store.dispatch(new moviesListActions.SetFilters(this.filters));
    }

    private buildQueryParams(): Params {
        return Object.assign({},
            {genre: this.filters.genre},
            this.filters.search
                ? {search: this.filters.search}
                : null
        );
    }

    private setInitialFilters(): void {
        combineLatest(
            this.store.select(fromMoviesList.getCurrentFilter),
            this.store.select(fromRoot.selectRouteQueryParameters)
        ).pipe(
            take(1)
        ).subscribe(([currentFilter, queryParams]: [MoviesFilter, Params]) => {
            this.filters = Object.assign({},
                currentFilter,
                queryParams.genre ? {genre: queryParams.genre} : null,
                queryParams.search ? {search: queryParams.search} : null
            );
            this.dispatchFiltersChangeAction();
        });
    }
}
