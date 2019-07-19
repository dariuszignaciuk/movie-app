import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListShellComponent } from './movies-list-shell.component';

describe('MoviesListShellComponent', () => {
  let component: MoviesListShellComponent;
  let fixture: ComponentFixture<MoviesListShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
