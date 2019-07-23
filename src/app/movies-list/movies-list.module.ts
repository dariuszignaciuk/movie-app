import {NgModule} from '@angular/core';
import {MoviesListShellComponent} from './containers/movies-list-shell/movies-list-shell.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {reducer} from './state/movies-list.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MoviesListEffects} from './state/movies-list.effects';
import {SharedModule} from '../shared/shared.module';
import {MoviesListComponent} from './components/movies-list/movies-list.component';
import {MovieBoxComponent} from './components/movie-box/movie-box.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {MoviesListHeaderComponent} from './components/movies-list-header/movies-list-header.component';
import {MoviesFilterComponent} from './components/movies-filter/movies-filter.component';
import {MoviesListGuard} from './services/movies-list.guard';

const moviesListRoutes: Routes = [
    {path: '', component: MoviesListShellComponent, canActivate: [MoviesListGuard]}
];

@NgModule({
    declarations: [
        MoviesListShellComponent,
        MoviesListComponent,
        MovieBoxComponent,
        SearchBarComponent,
        MoviesListHeaderComponent,
        MoviesFilterComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(moviesListRoutes),
        StoreModule.forFeature('moviesList', reducer),
        EffectsModule.forFeature(
            [MoviesListEffects]
        ),
    ],
    providers: [MoviesListGuard]
})
export class MoviesListModule {
}
