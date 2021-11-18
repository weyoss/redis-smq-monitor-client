import { IStatsState } from './stats/state';
import { INotificationsState } from './notifications/state';

export interface IStoreState {
    stats: IStatsState;
    notifications: INotificationsState;
}
