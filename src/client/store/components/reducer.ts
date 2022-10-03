import { combineReducers } from 'redux';
import { exchangeReducer } from './Exchange/reducer';
import { leftPanelReducer } from './LeftPanel/reducer';
import { IComponentsState } from './state';

export const componentsReducer = combineReducers<IComponentsState>({
    Exchange: exchangeReducer,
    LeftPanel: leftPanelReducer,
})