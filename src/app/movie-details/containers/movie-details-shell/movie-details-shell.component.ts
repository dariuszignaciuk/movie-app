import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromMovieDetails from '../../state';
import * as movieDetailsActions from '../../state/movie-details.actions';
import {Movie} from '../../../movie.model';
import {Observable} from 'rxjs';

@Component({
    templateUrl: './movie-details-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsShellComponent implements OnInit {
    public movie$: Observable<Movie>;

    constructor(private store: Store<fromMovieDetails.State>) {
    }

    ngOnInit() {
        this.store.dispatch(new movieDetailsActions.Load());
        this.movie$ = this.store.pipe(select(fromMovieDetails.getMovieDetails));
    }

}
