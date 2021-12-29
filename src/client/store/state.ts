import { INotificationsState } from './notifications/state';
import { IWebsocketMainStreamState } from './websocketMainStream/state';

export interface IStoreState {
    websocketMainStream: IWebsocketMainStreamState;
    notifications: INotificationsState;
}
