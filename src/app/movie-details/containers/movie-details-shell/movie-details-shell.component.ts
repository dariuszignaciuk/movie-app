import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromMovieDetails from '../../state';
import {Observable} from 'rxjs';
import {Movie} from '../../../shared/models/movie';

@Component({
    templateUrl: './movie-details-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsShellComponent implements OnInit {
    public movie$: Observable<Movie>;

    constructor(private store: Store<fromMovieDetails.State>) {
    }

    ngOnInit() {
        this.movie$ = this.store.pipe(select(fromMovieDetails.getMovieDetails));
    }

}
