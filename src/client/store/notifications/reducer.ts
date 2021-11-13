import { Reducer } from 'redux';
import { EActionType } from './action';
import { initialNotificationsState, INotificationsState } from './state';

export const notificationsReducer: Reducer<INotificationsState> = (state = initialNotificationsState, action) => {
    const { type } = action;
    if (type === EActionType.ADD_NOTIFICATION) {
        const { notification } = action.params;
        return {
            ...state,
            stack: [
                ...state.stack,
                {
                    ...notification,
                    id: Date.now()
                }
            ]
        };
    }
    if (type === EActionType.CLOSE_NOTIFICATION) {
        const { id } = action.params;
        return {
            ...state,
            stack: state.stack.filter((i) => i.id !== id)
        };
    }
    return state;
};
