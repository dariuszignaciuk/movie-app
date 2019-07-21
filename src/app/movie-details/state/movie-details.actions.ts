import {Action} from '@ngrx/store';
import {Movie} from '../../movie.model';

export enum MovieDetailsActionTypes {
    Load = '[MovieDetails] Load movie',
    LoadSuccess = '[MovieDetails] Load movie Success',
    LoadFail = '[MovieDetails] Load movie Fail',
}

export class Load implements Action {
    readonly type = MovieDetailsActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = MovieDetailsActionTypes.LoadSuccess;

    constructor(public payload: Movie) {
    }
}

export class LoadFail implements Action {
    readonly type = MovieDetailsActionTypes.LoadFail;

    constructor(public payload: string) {
    }
}

export type MovieDetailsActions = Load
    | LoadSuccess
    | LoadFail;
