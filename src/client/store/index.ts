import { combineReducers, Store, createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { ApplicationStateInterface } from './contract';
import { statsReducer, initialState as initialStatsState } from './stats/reducer';

const createRootReducer = () =>
    combineReducers<ApplicationStateInterface>({
        stats: statsReducer
    });

export const initialState: ApplicationStateInterface = {
    stats: initialStatsState
};

export default function configureStore(
    state: ApplicationStateInterface = initialState
): Store<ApplicationStateInterface> {
    const middleware = applyMiddleware(reduxImmutableStateInvariant(), thunk);
    return createStore(createRootReducer(), state, middleware);
}
