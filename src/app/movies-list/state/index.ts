import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MoviesListState} from './movies-list.reducer';
import * as fromRoot from '../../state';

export interface State extends fromRoot.State {
    moviesList: MoviesListState;
}

const getMoviesListFeatureState = createFeatureSelector<MoviesListState>('moviesList');

export const getMoviesList = createSelector(
    getMoviesListFeatureState,
    state => state.currentlyDisplayedMovies
);
