import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-movie-rating',
    templateUrl: './movie-rating.component.html',
    styleUrls: ['./movie-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieRatingComponent implements OnInit {
    @Input() rate: string;

    constructor() {
    }

    ngOnInit() {
    }

}
