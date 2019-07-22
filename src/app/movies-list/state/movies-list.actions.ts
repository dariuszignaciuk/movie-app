import {Action} from '@ngrx/store';
import {Movie} from '../../shared/models/movie';
import {MoviesFilter} from '../models/movies-filter';

export enum MoviesListActionTypes {
    Load = '[MoviesList] Load',
    LoadSuccess = '[MoviesList] Load Success',
    LoadFail = '[MoviesList] Load Fail',
    SetFilters = '[MoviesList] Set filters on movies list',
}

export class Load implements Action {
    readonly type = MoviesListActionTypes.Load;
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

export class SetFilters implements Action {
    readonly type = MoviesListActionTypes.SetFilters;

    constructor(public payload: MoviesFilter) {
    }
}

export type MoviesListActions = Load
    | LoadSuccess
    | LoadFail
    | SetFilters;
