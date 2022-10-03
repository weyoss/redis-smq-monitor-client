import { combineReducers } from 'redux';
import { exchangesReducer } from './Exchanges/reducer';
import { ILeftPanelState } from './state';

export const leftPanelReducer = combineReducers<ILeftPanelState>({
    Exchanges: exchangesReducer,
})