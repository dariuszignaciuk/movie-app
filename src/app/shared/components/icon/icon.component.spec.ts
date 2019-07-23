import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IconComponent} from './icon.component';
import {By} from '@angular/platform-browser';

describe('IconComponent', () => {
    let component: IconComponent;
    let fixture: ComponentFixture<IconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IconComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should set correct path to PNG icon', () => {
        component.iconName = 'test-icon';
        component.usePng = true;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toContain('assets/icons/test-icon.png');
    });

    it('should set correct path to SVG icon', () => {
        component.iconName = 'svg-test-icon';

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toContain('assets/icons/svg-test-icon.svg');
    });
});
