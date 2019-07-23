import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MoviesListComponent} from './movies-list.component';
import {MockComponent} from '../../../testing/mock-component';
import {By} from '@angular/platform-browser';
import {GenreType} from '../../../shared/models/genre-type';

describe('MoviesListComponent', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MoviesListComponent,
                MockComponent({selector: 'app-movie-box', inputs: ['movie']})
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoviesListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.movies = [];
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should render "No results" text when movies array is empty', () => {
        component.movies = [];
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('No results');
        expect(fixture.debugElement.queryAll(By.css('app-movie-box')).length).toBe(0);
    });

    it('should render one MovieBox for each movie', () => {
        component.movies = [
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
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('app-movie-box')).length).toBe(2);
    });
});
