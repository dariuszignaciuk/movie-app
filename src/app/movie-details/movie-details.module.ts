import {NgModule} from '@angular/core';
import {MovieDetailsShellComponent} from './containers/movie-details-shell/movie-details-shell.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

const movieDetailsRoutes: Routes = [
    {path: '', component: MovieDetailsShellComponent}
];

@NgModule({
    declarations: [MovieDetailsShellComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(movieDetailsRoutes),
    ]
})
export class MovieDetailsModule {
}
