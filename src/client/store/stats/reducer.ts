import { initialStatsState, IStatsState } from './state';
import { Reducer } from 'redux';
import { EActionType } from './action';

export const statsReducer: Reducer<IStatsState> = (state = initialStatsState, action) => {
    const { type } = action;
    if (type === EActionType.UPDATE_STATS) {
        const stats = action.stats;
        return {
            ...state,
            ...stats
        };
    }
    if (type === EActionType.SET_INITIALIZED) {
        return {
            ...state,
            loading: false,
            init: true
        };
    }
    return state;
};
