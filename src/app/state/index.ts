import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';

export interface State {
    isLoading: boolean;
}

export const selectRouterState =
    createFeatureSelector<RouterReducerState>('router');

export const selectRouteParameters = createSelector(
    selectRouterState,
    router => router.state.root.firstChild.params
);

