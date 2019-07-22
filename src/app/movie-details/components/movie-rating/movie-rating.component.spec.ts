import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MovieRatingComponent} from './movie-rating.component';
import {MockComponent} from '../../../testing/mock-component';

describe('MovieRatingComponent', () => {
    let component: MovieRatingComponent;
    let fixture: ComponentFixture<MovieRatingComponent>;
    let rate: string;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MovieRatingComponent,
                MockComponent({selector: 'app-icon', inputs: ['iconName']}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        rate = '5.8';

        fixture = TestBed.createComponent(MovieRatingComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display correct rate', () => {
        component.rate = rate;

        fixture.detectChanges();

        expect(fixture.nativeElement.textContent.trim()).toBe(rate);
    });
});
