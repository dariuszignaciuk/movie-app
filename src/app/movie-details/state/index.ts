import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../state';
import {MovieDetailsState} from './movie-details.reducer';


export interface State extends fromRoot.State {
    movieDetails: MovieDetailsState;
}

export const getMoviesListFeatureState = createFeatureSelector<MovieDetailsState>('movieDetails');

export const getMovieDetails = createSelector(
    getMoviesListFeatureState,
    state => state.movie
);
