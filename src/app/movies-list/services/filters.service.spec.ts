import {TestBed} from '@angular/core/testing';
import {FiltersService} from './filters.service';
import {GenreType} from '../../shared/models/genre-type';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromMoviesList from '../state';
import * as moviesListActions from '../state/movies-list.actions';
import {MemoizedSelector, Store} from '@ngrx/store';
import {MoviesFilter} from '../models/movies-filter';
import * as fromRoot from '../../state';
import {Params} from '@angular/router';

describe('FiltersService', () => {
    let store: MockStore<fromMoviesList.State>;
    let getCurrentFilter: MemoizedSelector<fromMoviesList.State, MoviesFilter>;
    let selectRouteQueryParameters: MemoizedSelector<fromRoot.State, Params>;
    let filter: MoviesFilter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                FiltersService,
                provideMockStore(),
            ]
        });
        filter = {
            search: '',
            genre: GenreType.Adventure
        };
        store = TestBed.get<Store<fromMoviesList.State>>(Store);
        getCurrentFilter = store.overrideSelector(fromMoviesList.getCurrentFilter, filter);
        selectRouteQueryParameters = store.overrideSelector(fromRoot.selectRouteQueryParameters, {});

    });

    it('should be created', () => {
        const service: FiltersService = TestBed.get(FiltersService);
        expect(service).toBeTruthy();
    });

    describe('setInitialFilters', () => {
        it('should emit filers$ from queryParams', () => {
            const params = {
                search: '',
                genre: GenreType.Mystery
            };
            selectRouteQueryParameters = store.overrideSelector(fromRoot.selectRouteQueryParameters, params);
            const service: FiltersService = TestBed.get(FiltersService);

            service.filters$.subscribe(filters => {
                expect(filters).toEqual(params);
            });

            service.setInitialFilters();
        });

        it('should emit filers$ with default filters', () => {
            const defaultFilter: MoviesFilter = {
                genre: null,
                search: ''
            };
            selectRouteQueryParameters = store.overrideSelector(fromRoot.selectRouteQueryParameters, {});
            const service: FiltersService = TestBed.get(FiltersService);

            service.filters$.subscribe(filters => {
                expect(filters).toEqual(defaultFilter);
            });

            service.setInitialFilters();
        });
    });

    describe('dispatchFiltersChangeAction', () => {
        it('should dispatch SetFilters action', (done) => {
            const service: FiltersService = TestBed.get(FiltersService);
            const filters = {
                search: 'test',
                genre: GenreType.Adventure
            };
            service.dispatchFiltersChangeAction(filters);

            store.scannedActions$.subscribe(action => {
                expect(action.type).toEqual(moviesListActions.MoviesListActionTypes.SetFilters);
                done();
            });
        });
    });
});
