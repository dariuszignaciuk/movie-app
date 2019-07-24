import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MoviesFilterComponent} from './movies-filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material';
import {GenreSelectItem} from '../../models/genre-select-item';
import {GenreType} from '../../../shared/models/genre-type';
import {SimpleChange, SimpleChanges} from '@angular/core';

describe('MoviesFilterComponent', () => {
    let component: MoviesFilterComponent;
    let fixture: ComponentFixture<MoviesFilterComponent>;
    let list: GenreSelectItem[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatSelectModule
            ],
            declarations: [
                MoviesFilterComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        list = [
            {value: GenreType.Thriller, name: 'Thriller'},
            {value: GenreType.Scifi, name: 'Scifi'},
            {value: GenreType.Crime, name: 'Crime'},
        ];

        fixture = TestBed.createComponent(MoviesFilterComponent);
        component = fixture.componentInstance;
        component.genresList = list;
    });

    it('should create', () => {
        const changesObj: SimpleChanges = {
            currentFilter: new SimpleChange(null, {
                genre: null,
                search: ''
            }, true)
        };

        component.ngOnChanges(changesObj);
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should fill formControl with passed filter', () => {
        const changesObj: SimpleChanges = {
            currentFilter: new SimpleChange(null, {
                genre: GenreType.Scifi,
                search: 'Scifi'
            }, true)
        };

        component.ngOnChanges(changesObj);
        fixture.detectChanges();

        expect(component.genreFilter.value).toBe(GenreType.Scifi);
    });

    it('should initialize formControl with null value if empty filter was passed', () => {
        const changesObj: SimpleChanges = {
            currentFilter: new SimpleChange(null, {
                genre: null,
                search: ''
            }, true)
        };

        component.ngOnChanges(changesObj);
        fixture.detectChanges();

        expect(component.genreFilter.value).toBe(null);
    });

    it('should emit genreFilterChanged on selection change', () => {
        spyOn(component.genreFilterChanged, 'emit');
        const changesObj: SimpleChanges = {
            currentFilter: new SimpleChange(null, {
                genre: null,
                search: ''
            }, true)
        };
        component.ngOnChanges(changesObj);
        fixture.detectChanges();

        component.genreFilter.setValue(GenreType.Sport);
        component.genreFilter.setValue(GenreType.Sport);
        component.genreFilter.setValue(GenreType.Sport);

        expect(component.genreFilterChanged.emit).toHaveBeenCalledWith(GenreType.Sport);
        expect(component.genreFilterChanged.emit).toHaveBeenCalledTimes(1);
    });
});
