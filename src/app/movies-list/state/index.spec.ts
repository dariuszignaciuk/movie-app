import {filterMovies} from './index';
import {Movie} from '../../shared/models/movie';
import {MoviesFilter} from '../models/movies-filter';
import {GenreType} from '../../shared/models/genre-type';

describe('Selectors: MoviesList', () => {
    describe('filterMovies', () => {
        let allMovies: Movie[];
        beforeEach(() => {
            allMovies = [
                {
                    rate: '5.1',
                    genres: [GenreType.Drama],
                    length: '1h 20min',
                    description: 'dummy desc',
                    name: 'aaaaaa',
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
                {
                    rate: '1.8',
                    genres: [GenreType.Adventure, GenreType.Drama],
                    length: '2h 10min',
                    description: 'mock desc',
                    name: 'bbbbbb',
                    img: 'mock/src',
                    key: 'mock-title',
                    id: 5
                },
            ];
        });

        it('should correctly filter movies ', () => {
            const filter: MoviesFilter = {
                search: 'a',
                genre: GenreType.Drama
            };

            const filtered: Movie[] = filterMovies(allMovies, filter);

            expect(filtered.length).toEqual(1);
            expect(filtered[0].name).toEqual('aaaaaa');
        });

        it('should return original movies list', () => {
            const filter: MoviesFilter = {
                search: '',
                genre: null
            };

            const filtered: Movie[] = filterMovies(allMovies, filter);

            expect(filtered.length).toEqual(allMovies.length);
        });
    });

});
