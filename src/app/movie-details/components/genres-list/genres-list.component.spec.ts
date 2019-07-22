import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GenresListComponent} from './genres-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {GenreType} from '../../../shared/models/genre-type';
import {By} from '@angular/platform-browser';

describe('GenresListComponent', () => {
    let component: GenresListComponent;
    let fixture: ComponentFixture<GenresListComponent>;
    let genres: GenreType[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                GenresListComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        genres = [GenreType.Action, GenreType.Drama, GenreType.Mystery];

        fixture = TestBed.createComponent(GenresListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should create one li for each genre', () => {
        component.genres = genres;

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
});
