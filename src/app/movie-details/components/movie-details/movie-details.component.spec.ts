import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MovieDetailsComponent} from './movie-details.component';
import {MockComponent} from '../../../testing/mock-component';
import {By} from '@angular/platform-browser';
import {Movie} from '../../../shared/models/movie';
import {GenreType} from '../../../shared/models/genre-type';

describe('MovieDetailsComponent', () => {
    let component: MovieDetailsComponent;
    let fixture: ComponentFixture<MovieDetailsComponent>;
    let movie: Movie;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MovieDetailsComponent,
                MockComponent({selector: 'app-movie-rating', inputs: ['rate']}),
                MockComponent({selector: 'app-genres-list', inputs: ['genres']}),
                MockComponent({selector: 'app-link-button', inputs: ['text', 'url', 'iconName']}),
            ]
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

        fixture = TestBed.createComponent(MovieDetailsComponent);
        component = fixture.componentInstance;
        component.imgNotFound = () => null;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should pass correct props to child components', () => {
        component.movie = movie;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('app-genres-list')).componentInstance.genres).toBe(movie.genres);
        expect(fixture.debugElement.query(By.css('app-movie-rating')).componentInstance.rate).toBe(movie.rate);
    });
});
