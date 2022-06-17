import { Reducer } from 'redux';
import { EActionType } from './action';
import { EWebsocketMainStreamStatus, initialWebsocketMainStreamState, IWebsocketMainStreamState } from './state';

export const websocketMainStreamReducer: Reducer<IWebsocketMainStreamState> = (
    state = initialWebsocketMainStreamState,
    action
) => {
    const { type } = action;
    if (type === EActionType.SET_PAYLOAD) {
        const payload = action.payload;
        return {
            ...state,
            status: EWebsocketMainStreamStatus.LOADED,
            payload: {
                ...payload
            }
        };
    }
    if (type === EActionType.SET_LOADING) {
        return {
            ...state,
            status: EWebsocketMainStreamStatus.LOADING
        };
    }
    return state;
};

