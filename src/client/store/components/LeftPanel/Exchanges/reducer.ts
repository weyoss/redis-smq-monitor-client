import { Reducer } from 'redux';
import { EActionType } from './action';
import { IExchangesState, initialExchangesState } from './state';

export const exchangesReducer: Reducer<IExchangesState> = (
    state = initialExchangesState,
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

