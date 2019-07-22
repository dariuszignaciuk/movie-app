import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Movie} from '../../../shared/models/movie';

@Component({
    selector: 'app-movie-box',
    templateUrl: './movie-box.component.html',
    styleUrls: ['./movie-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieBoxComponent {
    @Input() movie: Movie;
}
