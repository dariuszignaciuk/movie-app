import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    templateUrl: './movie-details-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsShellComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
