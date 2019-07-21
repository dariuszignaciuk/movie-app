import {Action} from '@ngrx/store';
import {LoadFilters, Movie} from '../../movie.model';

export enum MoviesListActionTypes {
    Load = '[MoviesList] Load',
    LoadWithFilters = '[MoviesList] Load with filters',
    LoadSuccess = '[MoviesList] Load Success',
    LoadFail = '[MoviesList] Load Fail',
    SearchMovies = '[MoviesList] Filter movies\' titles with search query',
}

export class Load implements Action {
    readonly type = MoviesListActionTypes.Load;
}

export class LoadWithFilters implements Action {
    readonly type = MoviesListActionTypes.LoadWithFilters;

    constructor(public payload: LoadFilters) {
    }
}

export class LoadSuccess implements Action {
    readonly type = MoviesListActionTypes.LoadSuccess;

    constructor(public payload: Movie[]) {
    }
}

export class LoadFail implements Action {
    readonly type = MoviesListActionTypes.LoadFail;

    constructor(public payload: string) {
    }
}

export class SearchMovies implements Action {
    readonly type = MoviesListActionTypes.SearchMovies;

    constructor(public payload: string) {
    }
}

export type MoviesListActions = Load
    | LoadWithFilters
    | LoadSuccess
    | LoadFail
    | SearchMovies;
