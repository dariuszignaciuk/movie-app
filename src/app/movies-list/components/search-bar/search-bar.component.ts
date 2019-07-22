import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MoviesFilter} from '../../models/movies-filter';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
    public search: FormControl;
    private sub: Subscription = new Subscription();

    @Input() currentFilter: MoviesFilter;
    @Output() searchQueryChanged: EventEmitter<string> = new EventEmitter();

    ngOnInit(): void {
        this.search = new FormControl(this.currentFilter.search);
        this.listenForChanges();
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
