import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MovieBoxComponent} from './movie-box.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Movie} from '../../../shared/models/movie';
import {GenreType} from '../../../shared/models/genre-type';
import {By} from '@angular/platform-browser';

describe('MovieBoxComponent', () => {
    let component: MovieBoxComponent;
    let fixture: ComponentFixture<MovieBoxComponent>;
    let movie: Movie;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                MovieBoxComponent
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
            img: '/src',
            key: 'dummy-title',
            id: 8
        };
        fixture = TestBed.createComponent(MovieBoxComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should bind correct props to template', () => {
        component.movie = movie;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('h3')).nativeElement.textContent).toBe(movie.name);
        expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toContain(movie.img);
    });
});
