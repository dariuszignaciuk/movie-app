import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-link-button',
    templateUrl: './link-button.component.html',
    styleUrls: ['./link-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkButtonComponent implements OnInit {
    @Input() text: string;
    @Input() url: string;

    constructor() {
    }

    ngOnInit() {
    }

}
