import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { IApplicationState } from './contract';
import { statsReducer } from './stats/reducer';
import { modalReducer } from './modal/reducer';
import { initialStatsState } from './stats/state';
import { initialModalState } from './modal/state';
import { notificationsReducer } from './notifications/reducer';
import { initialNotificationsState } from './notifications/state';

const createRootReducer = () =>
    combineReducers<IApplicationState>({
        stats: statsReducer,
        modal: modalReducer,
        notifications: notificationsReducer
    });

export const initialState: IApplicationState = {
    stats: initialStatsState,
    modal: initialModalState,
    notifications: initialNotificationsState
};

export default function configureStore(state: IApplicationState = initialState): Store<IApplicationState> {
    const middleware = applyMiddleware(reduxImmutableStateInvariant(), thunk);
    return createStore(createRootReducer(), state, middleware);
}
