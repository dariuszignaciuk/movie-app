import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LinkButtonComponent} from './link-button.component';
import {MockComponent} from '../../../testing/mock-component';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material';

describe('LinkButtonComponent', () => {
    let component: LinkButtonComponent;
    let fixture: ComponentFixture<LinkButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MatButtonModule],
            declarations: [
                LinkButtonComponent,
                MockComponent({selector: 'app-icon', inputs: ['iconName', 'usePng']}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkButtonComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should render correct text', () => {
        component.text = 'Hello World!';

        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toBe(component.text);
    });

    it('should render IconComponent if iconName is passed', () => {
        component.iconName = 'test';

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('app-icon')).length).toEqual(1);
    });

    it('should NOT render IconComponent if iconName is empty', () => {
        component.iconName = '';

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('app-icon')).length).toEqual(0);
    });
});
