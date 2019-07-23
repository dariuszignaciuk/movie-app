import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MoviesListHeaderComponent} from './movies-list-header.component';
import {GenreType} from '../../../shared/models/genre-type';
import {By} from '@angular/platform-browser';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-search-bar',
    template: ''
})
class MockSearchBarComponent {
    @Input() currentFilter;
    @Output() searchQueryChanged: EventEmitter<string> = new EventEmitter();
}

@Component({
    selector: 'app-movies-filter',
    template: ''
})
class MockMoviesFilterComponent {
    @Input() currentFilter;
    @Input() genresList;
    @Output() genreFilterChanged: EventEmitter<GenreType> = new EventEmitter();
}

describe('MoviesListHeaderComponent', () => {
    let component: MoviesListHeaderComponent;
    let fixture: ComponentFixture<MoviesListHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MoviesListHeaderComponent,
                MockSearchBarComponent,
                MockMoviesFilterComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoviesListHeaderComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should pass currentFilter and genresList to child components', () => {
        component.currentFilter = {
            search: 'test',
            genre: GenreType.Adventure
        };
        component.genresList = [{name: 'Adventure', value: GenreType.Adventure}];

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('app-search-bar')).componentInstance.currentFilter).toBe(component.currentFilter);
        expect(fixture.debugElement.query(By.css('app-movies-filter')).componentInstance.currentFilter).toBe(component.currentFilter);
        expect(fixture.debugElement.query(By.css('app-movies-filter')).componentInstance.genresList).toBe(component.genresList);
    });

    it('should emit events form child components', () => {
        spyOn(component.searchQueryChanged, 'emit');
        spyOn(component.genreFilterChanged, 'emit');
        fixture.detectChanges();

        fixture.debugElement.query(By.css('app-search-bar')).componentInstance.searchQueryChanged.emit('test query');
        fixture.debugElement.query(By.css('app-movies-filter')).componentInstance.genreFilterChanged.emit(GenreType.Crime);

        expect(component.searchQueryChanged.emit).toHaveBeenCalledWith('test query');
        expect(component.genreFilterChanged.emit).toHaveBeenCalledWith(GenreType.Crime);
    });
});
