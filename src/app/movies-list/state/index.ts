// Selector functions
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MoviesListState} from './movies-list.reducer';
import * as fromRoot from '../../state';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    movies: MoviesListState;
}

const getMoviesListFeatureState = createFeatureSelector<MoviesListState>('moviesList');

export const getMoviesList = createSelector(
    getMoviesListFeatureState,
    state => state.movies
);
