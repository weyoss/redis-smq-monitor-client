import { Reducer } from 'redux';
import { EActionType } from './action';
import { initialWebsocketMainStreamState, IWebsocketMainStreamState } from './state';

export const websocketMainStreamReducer: Reducer<IWebsocketMainStreamState> = (
    state = initialWebsocketMainStreamState,
    action
) => {
    const { type } = action;
    if (type === EActionType.SET_PAYLOAD) {
        const payload = action.payload;
        return {
            ...state,
            payload: {
                ...payload
            }
        };
    }
    if (type === EActionType.SET_LOADED) {
        return {
            ...state,
            loading: false
        };
    }
    return state;
};
