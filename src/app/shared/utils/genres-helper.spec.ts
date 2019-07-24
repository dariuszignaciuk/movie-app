import {GenresHelper} from './genres-helper';

describe('GenresHelper', () => {

    describe('createGenreFilterList', () => {
        it('should create genres list with "All" option as first', () => {
            const genresList = GenresHelper.createGenreFilterList();

            expect(genresList.length).toBeGreaterThan(1);
            expect(genresList[0].name).toBe('All');
        });
    });
});
