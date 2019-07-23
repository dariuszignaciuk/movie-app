import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
export class MoviesFilterComponent implements OnInit, OnDestroy {
    public genreFilter: FormControl;
    private sub: Subscription = new Subscription();

    @Input() genresList: GenreSelectItem[];
    @Input() currentFilter: MoviesFilter;
    @Output() genreFilterChanged: EventEmitter<GenreType> = new EventEmitter();

    ngOnInit(): void {
        this.genreFilter = new FormControl(this.findInitialValue());
        this.listenForChanges();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private findInitialValue(): GenreType {
        const match: GenreSelectItem = this.genresList.find(genre => genre.value === this.currentFilter.genre);
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
