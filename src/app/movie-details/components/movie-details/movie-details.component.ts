import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Movie} from '../../../shared/models/movie';
import {ImageHelper} from '../../../shared/utils/image-helper';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {
    public imgNotFound = ImageHelper.imageNotFound;
    @Input() movie: Movie;
}
