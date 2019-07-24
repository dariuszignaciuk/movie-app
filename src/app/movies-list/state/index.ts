import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MoviesListState} from './movies-list.reducer';
import * as fromRoot from '../../state';
import {Movie} from '../../shared/models/movie';
import {MoviesFilter} from '../models/movies-filter';

export interface State extends fromRoot.State {
    moviesList: MoviesListState;
}

export const getMoviesListFeatureState = createFeatureSelector<MoviesListState>('moviesList');

export const getMoviesList = createSelector(
    getMoviesListFeatureState,
    state => state.allMovies
);

export const getCurrentFilter = createSelector(
    getMoviesListFeatureState,
    state => state.filter
);

export const filterMovies = (allMovies: Movie[], filter: MoviesFilter) => {
    let filtered: Movie[] = allMovies;
    if (filter.genre) {
        filtered = filtered.filter(movie => movie.genres.includes(filter.genre));
    } else {
        filtered = allMovies;
    }
    filtered = filtered.filter(movie => movie.name.toLowerCase().includes(filter.search.toLowerCase()));
    return filtered;
};

export const getFilteredList = createSelector(
    getMoviesList,
    getCurrentFilter,
    filterMovies
);

