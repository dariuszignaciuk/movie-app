import {Injectable} from '@angular/core';
import {MoviesFilter} from '../models/movies-filter';
import {Params, Router} from '@angular/router';
import {combineLatest, Observable, Subject} from 'rxjs';
import * as fromMoviesList from '../state';
import * as fromRoot from '../../state';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as moviesListActions from '../state/movies-list.actions';

@Injectable()
export class FiltersService {
    public filters$: Observable<MoviesFilter>;
    private filtersSubject: Subject<MoviesFilter> = new Subject();

    constructor(private store: Store<fromMoviesList.State>,
                private router: Router) {
        this.filters$ = this.filtersSubject.asObservable();
    }

    public setInitialFilters(): void {
        combineLatest(
            this.store.select(fromMoviesList.getCurrentFilter),
            this.store.select(fromRoot.selectRouteQueryParameters)
        ).pipe(
            take(1)
        ).subscribe(this.handleFiltersChange.bind(this));
    }

    public dispatchFiltersChangeAction(filters: MoviesFilter): void {
        this.router.navigate(['/'], {queryParams: this.buildQueryParams(filters)});
        this.store.dispatch(new moviesListActions.SetFilters(filters));
    }

    private buildQueryParams(filters: MoviesFilter): Params {
        return Object.assign({},
            {genre: filters.genre},
            filters.search
                ? {search: filters.search}
                : null
        );
    }

    private handleFiltersChange([currentFilter, queryParams]: [MoviesFilter, Params]): void {
        let newFilters: MoviesFilter;

        if (this.shouldResetFilters(queryParams)) {
            newFilters = this.resetFilters();
        } else {
            newFilters = this.setFiltersWithParams(currentFilter, queryParams);
        }
        this.filtersSubject.next(newFilters);
    }

    private shouldResetFilters(queryParams: Params): boolean {
        return !queryParams.genre && !queryParams.search;
    }

    private resetFilters(): MoviesFilter {
        return Object.assign({},
            {
                search: '',
                genre: null
            }
        );
    }

    private setFiltersWithParams(currentFilter: MoviesFilter, queryParams: Params): MoviesFilter {
        return Object.assign({},
            currentFilter,
            {search: queryParams.search},
            queryParams.genre ? {genre: queryParams.genre} : null,
        );
    }
}
