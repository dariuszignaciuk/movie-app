import {MovieDetailsActions, MovieDetailsActionTypes} from './movie-details.actions';
import {Movie} from '../../shared/models/movie';

export interface MovieDetailsState {
    movie: Movie;
}

const initialState: MovieDetailsState = {
    movie: null,
};

export function reducer(state = initialState, action: MovieDetailsActions): MovieDetailsState {
    switch (action.type) {
        case MovieDetailsActionTypes.LoadSuccess:
            return {
                ...state,
                movie: action.payload,
            };
        case MovieDetailsActionTypes.LoadFail:
            return {
                ...state,
                movie: null,
            };
        default:
            return state;
    }
}
