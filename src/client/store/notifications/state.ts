export enum ENotificationType {
    SUCCESS = 'success',
    ERROR = 'danger'
}

export interface INotification {
    id: number;
    text: string;
    type: ENotificationType;
}

export interface INotificationsState {
    stack: INotification[];
}

export const initialNotificationsState: INotificationsState = {
    stack: []
};
