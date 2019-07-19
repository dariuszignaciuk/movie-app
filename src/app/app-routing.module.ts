import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./movies-list/movies-list.module').then(m => m.MoviesListModule)
    },
    {
        path: 'movie',
        loadChildren: () => import('./movie-details/movie-details.module.js').then(m => m.MovieDetailsModule)
    },
    {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
