import {reducer} from './movie-details.reducer';
import {MovieDetailsActionTypes} from './movie-details.actions';
import {Movie} from '../../shared/models/movie';
import {GenreType} from '../../shared/models/genre-type';

describe('Reducer: MovieDetails', () => {
    it('should have initial state of movie set to undefined', () => {
        const expected = {movie: undefined};
        const action = {type: 'foo'} as any;

        expect(reducer(undefined, action)).toEqual(expected);
    });

    it('should have movie details set', () => {
        const movieDetails: Movie = {
            rate: '5.1',
            genres: [GenreType.Mystery],
            length: '1h 20min',
            description: 'dummy desc',
            name: 'Dummy Title',
            img: 'src',
            key: 'dummy-title',
            id: 8
        };
        const expected = {movie: movieDetails};
        const state = {movie: null};
        const action = {type: MovieDetailsActionTypes.LoadSuccess, payload: movieDetails} as any;

        expect(reducer(state, action)).toEqual(expected);
    });

    it('should have movie set to null when load error occurs', () => {
        const expected = {movie: null};
        const state = {
            movie: {
                rate: '5.1',
                genres: [GenreType.Mystery],
                length: '1h 20min',
                description: 'dummy desc',
                name: 'Dummy Title',
                img: 'src',
                key: 'dummy-title',
                id: 8
            }
        };
        const action = {type: MovieDetailsActionTypes.LoadFail, payload: 'error'} as any;

        expect(reducer(state, action)).toEqual(expected);
    });
});
