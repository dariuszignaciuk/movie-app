import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../shared/models/movie';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent implements OnInit {

    @Input() movie: Movie;

    constructor() {
    }

    ngOnInit() {
    }

}
