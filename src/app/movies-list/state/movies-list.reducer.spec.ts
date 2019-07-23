import {Movie} from '../../shared/models/movie';
import {GenreType} from '../../shared/models/genre-type';
import {reducer} from './movies-list.reducer';
import {MoviesListActionTypes} from './movies-list.actions';

describe('Reducer: MoviesList', () => {
    it('should have initial state of allMovies set to empty aray and empty filter', () => {
        const expected = {
            allMovies: [],
            filter: {
                search: '',
                genre: null
            }
        };
        const action = {type: 'foo'} as any;

        expect(reducer(undefined, action)).toEqual(expected);
    });

    it('should have movies data set', () => {
        const movies: Movie[] = [
            {
                rate: '5.1',
                genres: [GenreType.Mystery],
                length: '1h 20min',
                description: 'dummy desc',
                name: 'Dummy Title',
                img: 'src',
                key: 'dummy-title',
                id: 8
            },
            {
                rate: '1.8',
                genres: [GenreType.Adventure, GenreType.Crime],
                length: '2h 10min',
                description: 'mock desc',
                name: 'Mock Title',
                img: 'mock/src',
                key: 'mock-title',
                id: 5
            },
        ];
        const expected = {
            allMovies: movies,
            filter: {
                search: '',
                genre: null
            }
        };
        const state = {
            allMovies: movies,
            filter: {
                search: '',
                genre: null
            }
        };
        const action = {type: MoviesListActionTypes.LoadSuccess, payload: movies} as any;

        expect(reducer(state, action)).toEqual(expected);
    });

    it('should have movies data to empty array when load error occurs', () => {
        const state = {
            allMovies: [
                {
                    rate: '5.1',
                    genres: [GenreType.Mystery],
                    length: '1h 20min',
                    description: 'dummy desc',
                    name: 'Dummy Title',
                    img: 'src',
                    key: 'dummy-title',
                    id: 8
                }
            ],
            filter: {
                search: '',
                genre: GenreType.Scifi
            }
        };
        const expected = {
            allMovies: [],
            filter: {
                search: '',
                genre: GenreType.Scifi
            }
        };
        const action = {
            type: MoviesListActionTypes.LoadFail,
            payload: 'error'
        } as any;

        expect(reducer(state, action)).toEqual(expected);
    });

    it('should have set filters corectly', () => {
        const state = {
            allMovies: [],
            filter: {
                search: '',
                genre: GenreType.Scifi
            }
        };
        const expected = {
            allMovies: [],
            filter: {
                search: 'test',
                genre: GenreType.Drama
            }
        };
        const action = {
            type: MoviesListActionTypes.SetFilters,
            payload: {
                search: 'test',
                genre: GenreType.Drama
            }
        } as any;

        expect(reducer(state, action)).toEqual(expected);
    });
});
