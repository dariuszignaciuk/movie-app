import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MoviesFilter} from '../../models/movies-filter';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, OnChanges, OnDestroy {
    public search: FormControl = new FormControl();
    private sub: Subscription = new Subscription();

    @Input() currentFilter: MoviesFilter;
    @Output() searchQueryChanged: EventEmitter<string> = new EventEmitter();

    ngOnInit(): void {
        this.listenForChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.currentFilter) {
            this.search.setValue(changes.currentFilter.currentValue.search);
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private listenForChanges(): void {
        this.sub.add(this.search.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(val => {
                this.searchQueryChanged.emit(val);
            }));
    }
}
