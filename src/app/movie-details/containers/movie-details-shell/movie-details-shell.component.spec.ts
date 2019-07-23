import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MovieDetailsShellComponent} from './movie-details-shell.component';
import {MockComponent} from '../../../testing/mock-component';
import {MemoizedSelector, Store} from '@ngrx/store';
import * as fromMovieDetails from '../../state';
import {GenreType} from '../../../shared/models/genre-type';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Movie} from '../../../shared/models/movie';

describe('MovieDetailsShellComponent', () => {
    let component: MovieDetailsShellComponent;
    let fixture: ComponentFixture<MovieDetailsShellComponent>;
    let store: MockStore<fromMovieDetails.State>;
    let getMovieDetails: MemoizedSelector<fromMovieDetails.State, Movie>;
    let movie: Movie;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MovieDetailsShellComponent,
                MockComponent({selector: 'app-movie-details', inputs: ['movie']}),
            ],
            providers: [
                provideMockStore(),
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        movie = {
            rate: '5.1',
            genres: [GenreType.Mystery],
            length: '1h 20min',
            description: 'dummy desc',
            name: 'Dummy Title',
            img: 'src',
            key: 'dummy-title',
            id: 8
        };
        store = TestBed.get<Store<fromMovieDetails.State>>(Store);
        getMovieDetails = store.overrideSelector(fromMovieDetails.getMovieDetails, movie);

        fixture = TestBed.createComponent(MovieDetailsShellComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should get movie details from store', (done) => {
        fixture.detectChanges();

        component.movie$.subscribe(m => {
            expect(m.name).toEqual(movie.name);
            expect(m.genres).toEqual(movie.genres);
            done();
        });
    });
});
