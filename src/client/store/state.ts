import { INotificationsState } from './notifications/state';
import { IWebsocketMainStreamState } from './websocket-main-stream/state';
import { IComponentsState } from './components/state';

export interface IStoreState {
    websocketMainStream: IWebsocketMainStreamState;
    notifications: INotificationsState;
    components: IComponentsState;
}
