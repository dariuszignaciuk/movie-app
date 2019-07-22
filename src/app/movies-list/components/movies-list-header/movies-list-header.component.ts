import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {GenreType} from '../../../shared/models/genre-type';
import {GenreSelectItem} from '../../models/genre-select-item';
import {MoviesFilter} from '../../models/movies-filter';

@Component({
    selector: 'app-movies-list-header',
    templateUrl: './movies-list-header.component.html',
    styleUrls: ['./movies-list-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListHeaderComponent {
    @Input() genresList: GenreSelectItem[];
    @Input() currentFilter: MoviesFilter;
    @Output() searchQueryChanged: EventEmitter<string> = new EventEmitter();
    @Output() genreFilterChanged: EventEmitter<GenreType> = new EventEmitter();
}
