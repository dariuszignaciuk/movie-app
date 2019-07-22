import {GenreType} from '../models/genre-type';
import {GenreSelectItem} from '../../movies-list/models/genre-select-item';

export abstract class GenresHelper {
    public static createGenreFilterList(): GenreSelectItem[] {
        return [
            {
                name: 'All',
                value: null
            },
            ...Object.keys(GenreType).map(key => ({
                name: key,
                value: GenreType[key]
            })),
        ];
    }
}
