import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-link-button',
    templateUrl: './link-button.component.html',
    styleUrls: ['./link-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkButtonComponent {
    @Input() text: string;
    @Input() url: string;
    @Input() iconName: string;
    @Input() usePngIcon: boolean;
}
