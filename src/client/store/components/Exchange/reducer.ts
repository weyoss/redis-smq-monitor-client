import { Reducer } from 'redux';
import { EActionType } from './action';
import {
    IExchangeState, initialExchangeState,
} from './state';

export const exchangeReducer: Reducer<IExchangeState> = (
    state = initialExchangeState,
    action
) => {
    const { type } = action;
    if (type === EActionType.RELOAD) {
        return {
            ...state,
            version: state.version + 1
        };
    }
    return state;
};

