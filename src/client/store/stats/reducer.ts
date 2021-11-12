import { EActionType, IStatsState } from './contract';
import { Reducer } from 'redux';

export const initialState: IStatsState = {
    loading: true,
    rates: {
        input: 0,
        processing: 0,
        acknowledged: 0,
        unacknowledged: 0
    },
    queues: {}
};

export const statsReducer: Reducer<IStatsState> = (state = initialState, action) => {
    const { type } = action;
    if (type === EActionType.UPDATE_STATS) {
        const stats = action.stats;
        return {
            ...state,
            ...stats,
            loading: false
        };
    }
    return state;
};
