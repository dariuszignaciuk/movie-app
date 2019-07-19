import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListHeaderComponent } from './movies-list-header.component';

describe('MoviesListHeaderComponent', () => {
  let component: MoviesListHeaderComponent;
  let fixture: ComponentFixture<MoviesListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
