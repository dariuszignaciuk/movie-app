import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MoviesListState} from './movies-list.reducer';
import * as fromRoot from '../../state';
import {Movie} from '../../shared/models/movie';

export interface State extends fromRoot.State {
    moviesList: MoviesListState;
}

const getMoviesListFeatureState = createFeatureSelector<MoviesListState>('moviesList');

export const getMoviesList = createSelector(
    getMoviesListFeatureState,
    state => state.allMovies
);

export const getCurrentFilter = createSelector(
    getMoviesListFeatureState,
    state => state.filter
);

export const getFilteredList = createSelector(
    getMoviesList,
    getCurrentFilter,
    (allMovies, filter) => {
        let filtered: Movie[] = allMovies;
        if (filter.genre) {
            filtered = filtered.filter(movie => movie.genres.includes(filter.genre));
        } else {
            filtered = allMovies;
        }
        filtered = filtered.filter(movie => movie.name.toLowerCase().includes(filter.search.toLowerCase()));
        return filtered;
    }
);
