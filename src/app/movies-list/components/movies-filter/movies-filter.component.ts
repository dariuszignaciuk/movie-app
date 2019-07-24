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
import {distinctUntilChanged} from 'rxjs/operators';
import {GenreSelectItem} from '../../models/genre-select-item';
import {GenreType} from '../../../shared/models/genre-type';
import {Subscription} from 'rxjs';
import {MoviesFilter} from '../../models/movies-filter';

@Component({
    selector: 'app-movies-filter',
    templateUrl: './movies-filter.component.html',
    styleUrls: ['./movies-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesFilterComponent implements OnInit, OnChanges, OnDestroy {
    public genreFilter: FormControl = new FormControl();
    private sub: Subscription = new Subscription();

    @Input() genresList: GenreSelectItem[];
    @Input() currentFilter: MoviesFilter;
    @Output() genreFilterChanged: EventEmitter<GenreType> = new EventEmitter();

    ngOnInit(): void {
        this.listenForChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.currentFilter) {
            this.genreFilter.setValue(this.findInitialValue(changes.currentFilter.currentValue));
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private findInitialValue(newFilter: MoviesFilter): GenreType {
        const match: GenreSelectItem = this.genresList.find(genre => genre.value === newFilter.genre);
        return match ? match.value : null;
    }

    private listenForChanges(): void {
        this.sub.add(this.genreFilter.valueChanges
            .pipe(
                distinctUntilChanged()
            )
            .subscribe(val => {
                this.genreFilterChanged.emit(val);
            }));
    }
}
