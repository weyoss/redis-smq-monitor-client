import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { IStoreState } from './state';
import { notificationsReducer } from './notifications/reducer';
import { initialNotificationsState } from './notifications/state';
import { websocketMainStreamReducer } from './websocketMainStream/reducer';
import { initialWebsocketMainStreamState } from './websocketMainStream/state';

const createRootReducer = () =>
    combineReducers<IStoreState>({
        websocketMainStream: websocketMainStreamReducer,
        notifications: notificationsReducer
    });

export const initialState: IStoreState = {
    websocketMainStream: initialWebsocketMainStreamState,
    notifications: initialNotificationsState
};

export default function configureStore(state: IStoreState = initialState): Store<IStoreState> {
    const middleware = applyMiddleware(reduxImmutableStateInvariant(), thunk);
    return createStore(createRootReducer(), state, middleware);
}
