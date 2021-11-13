import { Reducer } from 'redux';
import { EActionType } from './action';
import { IModalState, initialModalState } from './state';

export const modalReducer: Reducer<IModalState> = (currentState = initialModalState, action) => {
    const { type } = action;
    if (type === EActionType.SHOW_MODAL) {
        const state = action.params;
        return {
            ...currentState,
            ...state
        };
    }
    if (type === EActionType.HIDE_MODAL) {
        return {
            ...currentState,
            show: false
        };
    }
    return currentState;
};
