import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GenreType} from '../../../shared/models/genre-type';

@Component({
    selector: 'app-genres-list',
    templateUrl: './genres-list.component.html',
    styleUrls: ['./genres-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresListComponent {
    @Input() genres: GenreType[];
}
