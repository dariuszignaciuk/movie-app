import {Action} from '@ngrx/store';
import {Movie} from '../../movie.model';

export enum MoviesListActionTypes {
    Load = '[MoviesList] Load',
    LoadSuccess = '[MoviesList] Load Success',
    LoadFail = '[MoviesList] Load Fail',
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

export type MoviesListActions = Load
    | LoadSuccess
    | LoadFail;
