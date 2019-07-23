import {NgModule} from '@angular/core';
import {MovieDetailsShellComponent} from './containers/movie-details-shell/movie-details-shell.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './state/movie-details.reducer';
import {MovieDetailsEffects} from './state/movie-details.effects';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {GenresListComponent} from './components/genres-list/genres-list.component';
import {MovieRatingComponent} from './components/movie-rating/movie-rating.component';

const movieDetailsRoutes: Routes = [
    {path: '', component: MovieDetailsShellComponent}
];

@NgModule({
    declarations: [MovieDetailsShellComponent, MovieDetailsComponent, GenresListComponent, MovieRatingComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(movieDetailsRoutes),
        StoreModule.forFeature('movieDetails', reducer),
        EffectsModule.forFeature(
            [MovieDetailsEffects]
        ),
    ]
})
export class MovieDetailsModule {
}
