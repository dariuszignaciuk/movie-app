import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../movie.model';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
    @Input() movies: Movie[];

    constructor() {
    }

    ngOnInit() {
    }

}
