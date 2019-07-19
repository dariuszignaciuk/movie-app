import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsShellComponent } from './movie-details-shell.component';

describe('MovieDetailsShellComponent', () => {
  let component: MovieDetailsShellComponent;
  let fixture: ComponentFixture<MovieDetailsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
