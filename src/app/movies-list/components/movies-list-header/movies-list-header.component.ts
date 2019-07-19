import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-movies-list-header',
    templateUrl: './movies-list-header.component.html',
    styleUrls: ['./movies-list-header.component.scss']
})
export class MoviesListHeaderComponent implements OnInit {
    @Output() searchQueryChanged: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
