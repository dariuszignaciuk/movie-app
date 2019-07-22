import {MovieDetailsActions, MovieDetailsActionTypes} from './movie-details.actions';
import {Movie} from '../../shared/models/movie';

export interface MovieDetailsState {
    movie: Movie;
    error: string;
}

const initialState: MovieDetailsState = {
    movie: null,
    error: '',
};

export function reducer(state = initialState, action: MovieDetailsActions): MovieDetailsState {
    switch (action.type) {
        case MovieDetailsActionTypes.LoadSuccess:
            return {
                ...state,
                movie: action.payload,
                error: ''
            };
        case MovieDetailsActionTypes.LoadFail:
            return {
                ...state,
                movie: null,
                error: action.payload
            };
        default:
            return state;
    }
}
