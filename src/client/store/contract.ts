import { IStatsState } from './stats/state';
import { IModalState } from './modal/state';
import { INotificationsState } from './notifications/state';

export interface IApplicationState {
    stats: IStatsState;
    modal: IModalState;
    notifications: INotificationsState;
}
