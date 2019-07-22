import {GenreType} from '../../shared/models/genre-type';

export interface MoviesFilter {
    search: string;
    genre: GenreType;
}
