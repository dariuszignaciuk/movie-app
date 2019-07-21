import {Movie} from '../../movie.model';
import {MoviesListActions, MoviesListActionTypes} from './movies-list.actions';

export interface MoviesListState {
    allMovies: Movie[];
    currentlyDisplayedMovies: Movie[];
    search: string;
    error: string;
}

const initialState: MoviesListState = {
    allMovies: [],
    currentlyDisplayedMovies: [],
    search: '',
    error: '',
};

export function reducer(state = initialState, action: MoviesListActions): MoviesListState {
    switch (action.type) {
        case MoviesListActionTypes.LoadSuccess:
            return {
                ...state,
                allMovies: action.payload,
                currentlyDisplayedMovies: action.payload,
                error: ''
            };
        case MoviesListActionTypes.LoadFail:
            return {
                ...state,
                allMovies: [],
                currentlyDisplayedMovies: [],
                error: action.payload
            };
        case MoviesListActionTypes.SearchMovies:
            return {
                ...state,
                search: action.payload,
                currentlyDisplayedMovies: state.allMovies.filter(movie => movie.name.toLowerCase().includes(action.payload.toLowerCase()))
            };
        default:
            return state;
    }
}
