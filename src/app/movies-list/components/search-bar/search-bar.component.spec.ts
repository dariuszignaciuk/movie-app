import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SearchBarComponent} from './search-bar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MockComponent} from '../../../testing/mock-component';
import {GenreType} from '../../../shared/models/genre-type';
import {SimpleChange, SimpleChanges} from '@angular/core';

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [
                SearchBarComponent,
                MockComponent({selector: '[matInput]'}),
                MockComponent({selector: 'mat-form-field'}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
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
                search: 'test'
            }, true)
        };

        component.ngOnChanges(changesObj);
        fixture.detectChanges();

        expect(component.search.value).toBe('test');
    });

    it('should emit searchQueryChanged on input change once every 300ms and not repeat itself', fakeAsync(() => {
        spyOn(component.searchQueryChanged, 'emit');

        const changesObj: SimpleChanges = {
            currentFilter: new SimpleChange(null, {
                genre: null,
                search: ''
            }, true)
        };
        component.ngOnChanges(changesObj);
        fixture.detectChanges();

        component.search.setValue('test 1');
        component.search.setValue('test 1');
        component.search.setValue('test 2');
        component.search.setValue('test 2');
        tick(300);

        expect(component.searchQueryChanged.emit).toHaveBeenCalledWith('test 2');
        expect(component.searchQueryChanged.emit).toHaveBeenCalledTimes(1);
    }));
});
