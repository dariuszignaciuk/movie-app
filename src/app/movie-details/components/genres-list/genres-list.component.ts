import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GenreType} from '../../../shared/models/genre-type';

@Component({
    selector: 'app-genres-list',
    templateUrl: './genres-list.component.html',
    styleUrls: ['./genres-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresListComponent implements OnInit {
    @Input() genres: GenreType[];

    constructor() {
    }

    ngOnInit() {
    }

}
