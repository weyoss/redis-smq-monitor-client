import { INotificationsState } from './notifications/state';
import { IWebsocketMainStreamState } from './websocket-main-stream/state';

export interface IStoreState {
    websocketMainStream: IWebsocketMainStreamState;
    notifications: INotificationsState;
}
