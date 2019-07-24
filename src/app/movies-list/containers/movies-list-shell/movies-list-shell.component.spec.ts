import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MoviesListShellComponent} from './movies-list-shell.component';
import {MockComponent} from '../../../testing/mock-component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromMoviesList from '../../state';
import {MemoizedSelector, Store} from '@ngrx/store';
import {Movie} from '../../../shared/models/movie';
import * as fromMovieDetails from '../../../movie-details/state';
import {GenreType} from '../../../shared/models/genre-type';
import {RouterTestingModule} from '@angular/router/testing';
import {MoviesFilter} from '../../models/movies-filter';
import {FiltersService} from '../../services/filters.service';
import {of} from 'rxjs';

describe('MoviesListShellComponent', () => {
    let component: MoviesListShellComponent;
    let fixture: ComponentFixture<MoviesListShellComponent>;
    let store: MockStore<fromMoviesList.State>;
    let getMoviesList: MemoizedSelector<fromMoviesList.State, Movie[]>;
    let getCurrentFilter: MemoizedSelector<fromMoviesList.State, MoviesFilter>;
    let list: Movie[];
    let filter: MoviesFilter;
    let mockFilterService;

    beforeEach(async(() => {
        mockFilterService = jasmine.createSpyObj(['setInitialFilters', 'dispatchFiltersChangeAction']);
        mockFilterService.filters$ = of({search: '', genre: null});

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            declarations: [
                MoviesListShellComponent,
                MockComponent({selector: 'app-movies-list-header', inputs: ['genresList', 'currentFilter']}),
                MockComponent({selector: 'app-movies-list', inputs: ['movies']})
            ],
            providers: [
                provideMockStore(),
                {provide: FiltersService, useValue: mockFilterService}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        list = [
            {
                rate: '5.1',
                genres: [GenreType.Mystery],
                length: '1h 20min',
                description: 'dummy desc',
                name: 'Dummy Title',
                img: 'src',
                key: 'dummy-title',
                id: 8
            },
            {
                rate: '1.8',
                genres: [GenreType.Adventure, GenreType.Crime],
                length: '2h 10min',
                description: 'mock desc',
                name: 'Mock Title',
                img: 'mock/src',
                key: 'mock-title',
                id: 5
            },
        ];
        filter = {
            search: '',
            genre: GenreType.Adventure
        };
        store = TestBed.get<Store<fromMovieDetails.State>>(Store);
        getMoviesList = store.overrideSelector(fromMoviesList.getMoviesList, list);
        getCurrentFilter = store.overrideSelector(fromMoviesList.getCurrentFilter, filter);

        fixture = TestBed.createComponent(MoviesListShellComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should correctly filter movie list from store', (done) => {
        fixture.detectChanges();

        component.movies$.subscribe(movies => {
            expect(movies.length).toEqual(1);
            expect(movies[0].img).toEqual(list[1].img);
            done();
        });
    });

    describe('searchQueryChanged', () => {
        it('should add search query to filters', () => {
            fixture.detectChanges();
            component.filters = {
                search: 'test',
                genre: null
            };

            component.searchQueryChanged('hello world');

            expect(component.filters.search).toEqual('hello world');
        });

        it('should not change genre filter', () => {
            fixture.detectChanges();
            component.filters = {
                search: 'test',
                genre: GenreType.Crime
            };

            component.searchQueryChanged('hello world');

            expect(component.filters.genre).toEqual(GenreType.Crime);
        });

        it('should call dispatchFiltersChangeAction action on service', () => {
            fixture.detectChanges();
            component.filters = {
                search: 'test',
                genre: GenreType.Adventure
            };

            component.searchQueryChanged('hello world');
            expect(mockFilterService.dispatchFiltersChangeAction).toHaveBeenCalled();
        });
    });

    describe('genreFilterChanged', () => {
        it('should change genre prop in filters', () => {
            fixture.detectChanges();
            component.filters = {
                search: '',
                genre: GenreType.Scifi
            };

            component.genreFilterChanged(GenreType.Drama);

            expect(component.filters.genre).toEqual(GenreType.Drama);
        });

        it('should not change search filter', () => {
            fixture.detectChanges();
            component.filters = {
                search: 'test',
                genre: GenreType.Crime
            };

            component.genreFilterChanged(GenreType.Drama);

            expect(component.filters.search).toEqual('test');
        });

        it('should call dispatchFiltersChangeAction action on service', () => {
            fixture.detectChanges();
            component.filters = {
                search: 'test',
                genre: GenreType.Adventure
            };

            component.genreFilterChanged(GenreType.Drama);

            expect(mockFilterService.dispatchFiltersChangeAction).toHaveBeenCalled();
        });
    });
});
