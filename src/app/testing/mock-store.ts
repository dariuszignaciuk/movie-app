import {Subject} from 'rxjs';
import {Action, Store} from '@ngrx/store';


export function mockStore<T>({
                                 actions = new Subject<Action>(),
                                 states = new Subject<T>()
                             }: {
    actions?: Subject<Action>,
    states?: Subject<T>
}): Store<T> {

    const result = states as any;
    result.dispatch = (action: Action) => actions.next(action);
    return result;
}
