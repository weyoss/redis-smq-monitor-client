import { ActionType, StatsStateInterface } from './contract';
import { Reducer } from 'redux';

export const initialState: StatsStateInterface = {
    rates: {
        input: 0,
        processing: 0,
        acknowledged: 0,
        unacknowledged: 0
    },
    queues: {}
};

export const statsReducer: Reducer<StatsStateInterface> = (state = initialState, action) => {
    const { type } = action;
    if (type === ActionType.UPDATE_STATS) {
        const stats = action.stats;
        return {
            ...state,
            ...stats
        };
    }
    return state;
};
