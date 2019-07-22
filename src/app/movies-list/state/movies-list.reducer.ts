import {MoviesListActions, MoviesListActionTypes} from './movies-list.actions';
import {Movie} from '../../shared/models/movie';
import {MoviesFilter} from '../models/movies-filter';

export interface MoviesListState {
    allMovies: Movie[];
    filter: MoviesFilter;
}

const initialState: MoviesListState = {
    allMovies: [],
    filter: {
        search: '',
        genre: null
    },
};

export function reducer(state = initialState, action: MoviesListActions): MoviesListState {
    switch (action.type) {
        case MoviesListActionTypes.LoadSuccess:
            return {
                ...state,
                allMovies: action.payload,
            };
        case MoviesListActionTypes.LoadFail:
            return {
                ...state,
                allMovies: [],
            };
        case MoviesListActionTypes.SetFilters:
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
}
