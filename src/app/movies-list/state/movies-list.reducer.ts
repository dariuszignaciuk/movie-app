import {Movie} from '../../movie.model';
import {MoviesListActions, MoviesListActionTypes} from './movies-list.actions';

export interface MoviesListState {
    movies: Movie[];
    error: string;
}

const initialState: MoviesListState = {
    movies: [],
    error: '',
};

export function reducer(state = initialState, action: MoviesListActions): MoviesListState {

    switch (action.type) {
        case MoviesListActionTypes.LoadSuccess:
            return {
                ...state,
                movies: action.payload,
                error: ''
            };

        case MoviesListActionTypes.LoadFail:
            return {
                ...state,
                movies: [],
                error: action.payload
            };

        default:
            return state;
    }
}
