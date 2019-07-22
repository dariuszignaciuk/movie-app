import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Movie} from '../../../shared/models/movie';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
    @Input() movies: Movie[];
}
