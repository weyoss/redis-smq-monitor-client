import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { IApplicationState } from './contract';
import { statsReducer, initialState as initialStatsState } from './stats/reducer';

const createRootReducer = () =>
    combineReducers<IApplicationState>({
        stats: statsReducer
    });

export const initialState: IApplicationState = {
    stats: initialStatsState
};

export default function configureStore(state: IApplicationState = initialState): Store<IApplicationState> {
    const middleware = applyMiddleware(reduxImmutableStateInvariant(), thunk);
    return createStore(createRootReducer(), state, middleware);
}
