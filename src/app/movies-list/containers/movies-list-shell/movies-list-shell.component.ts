import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromMoviesList from '../../state/';
import {Observable, Subscription} from 'rxjs';
import {Movie} from '../../../shared/models/movie';
import {GenreType} from '../../../shared/models/genre-type';
import {MoviesFilter} from '../../models/movies-filter';
import {GenreSelectItem} from '../../models/genre-select-item';
import {GenresHelper} from '../../../shared/utils/genres-helper';
import {FiltersService} from '../../services/filters.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './movies-list-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListShellComponent implements OnInit, OnDestroy {
    public movies$: Observable<Movie[]>;
    public genresList: GenreSelectItem[] = GenresHelper.createGenreFilterList();
    public filters: MoviesFilter = {
        search: '',
        genre: null
    };
    private sub: Subscription = new Subscription();

    constructor(private store: Store<fromMoviesList.State>,
                private route: ActivatedRoute,
                private filtersService: FiltersService) {
    }

    ngOnInit(): void {
        this.listenToFiltersChanges();
        this.initFiltersCheck();
        this.movies$ = this.store.pipe(select(fromMoviesList.getFilteredList));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public searchQueryChanged(search: string): void {
        this.filters = {
            ...this.filters,
            search
        };
        this.filtersService.dispatchFiltersChangeAction(this.filters);
    }

    public genreFilterChanged(genre: GenreType): void {
        this.filters = {
            ...this.filters,
            genre
        };
        this.filtersService.dispatchFiltersChangeAction(this.filters);
    }

    private listenToFiltersChanges(): void {
        this.sub.add(this.filtersService.filters$.subscribe(filters => {
            this.filters = filters;
            this.filtersService.dispatchFiltersChangeAction(this.filters);
        }));
    }

    private initFiltersCheck(): void {

        this.route.queryParams.subscribe(() => {
            this.filtersService.setInitialFilters();
        });
        this.filtersService.setInitialFilters();
    }
}
