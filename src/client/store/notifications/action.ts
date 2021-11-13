import { ENotificationType } from './state';

export enum EActionType {
    ADD_NOTIFICATION = 'ADD_NOTIFICATION',
    CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'
}

export function addNotificationAction(text: string, type: ENotificationType) {
    return {
        type: EActionType.ADD_NOTIFICATION,
        params: {
            notification: {
                id: Date.now(),
                text,
                type
            }
        }
    };
}

export function closeNotificationAction(id: number) {
    return {
        type: EActionType.CLOSE_NOTIFICATION,
        params: {
            id
        }
    };
}
