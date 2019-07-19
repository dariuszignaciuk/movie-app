import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
    public searchForm: FormGroup;

    @Output() searchQueryChanged: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.searchForm = this.initForm();
        this.emitChanges();
    }

    private initForm(): FormGroup {
        return new FormGroup({
            search: new FormControl()
        });
    }

    private emitChanges(): void {
        this.searchForm.get('search').valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(val => {
                this.searchQueryChanged.emit(val);
            });
    }

}
