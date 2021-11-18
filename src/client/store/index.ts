import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { IStoreState } from './state';
import { statsReducer } from './stats/reducer';
import { initialStatsState } from './stats/state';
import { notificationsReducer } from './notifications/reducer';
import { initialNotificationsState } from './notifications/state';

const createRootReducer = () =>
    combineReducers<IStoreState>({
        stats: statsReducer,
        notifications: notificationsReducer
    });

export const initialState: IStoreState = {
    stats: initialStatsState,
    notifications: initialNotificationsState
};

export default function configureStore(state: IStoreState = initialState): Store<IStoreState> {
    const middleware = applyMiddleware(reduxImmutableStateInvariant(), thunk);
    return createStore(createRootReducer(), state, middleware);
}
