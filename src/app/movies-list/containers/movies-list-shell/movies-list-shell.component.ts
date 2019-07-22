import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moviesListActions from '../../state/movies-list.actions';
import {select, Store} from '@ngrx/store';
import * as fromMoviesList from '../../state/';
import {Observable} from 'rxjs';
import {Movie} from '../../../shared/models/movie';
import {GenreType} from '../../../shared/models/genre-type';
import {MoviesFilter} from '../../models/movies-filter';
import {GenreSelectItem} from '../../models/genre-select-item';
import {take} from 'rxjs/operators';

@Component({
    templateUrl: './movies-list-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListShellComponent implements OnInit {
    public movies$: Observable<Movie[]>;
    public genresList: GenreSelectItem[];
    public filters: MoviesFilter = {
        search: '',
        genre: null
    };

    constructor(private store: Store<fromMoviesList.State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new moviesListActions.Load());
        this.getInitialFilters();
        this.movies$ = this.store.pipe(select(fromMoviesList.getFilteredList));
        this.createGenresList();
    }

    public searchQueryChanged(search: string): void {
        this.filters = {
            ...this.filters,
            search
        };
        this.store.dispatch(new moviesListActions.SetFilters(this.filters));
    }

    public genreFilterChanged(genre: GenreType): void {
        this.filters = {
            ...this.filters,
            genre
        };
        this.store.dispatch(new moviesListActions.SetFilters(this.filters));
    }

    private getInitialFilters(): void {
        this.store
            .pipe(
                select(fromMoviesList.getCurrentFilter),
                take(1)
            )
            .subscribe(filter => {
                this.filters = filter;
            });
    }

    private createGenresList(): void {
        this.genresList = [
            {
                name: 'All',
                value: null
            },
            ...Object.keys(GenreType).map(key => ({
                name: key,
                value: GenreType[key]
            })),
        ];
    }

}
