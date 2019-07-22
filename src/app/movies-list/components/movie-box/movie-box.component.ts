import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../shared/models/movie';

@Component({
    selector: 'app-movie-box',
    templateUrl: './movie-box.component.html',
    styleUrls: ['./movie-box.component.scss']
})
export class MovieBoxComponent implements OnInit {
    @Input() movie: Movie;

    constructor() {
    }

    ngOnInit() {
    }

}
