import { Stats } from '../../models/Stats';

export enum ActionType {
    UPDATE_STATS = 'UPDATE_STATS'
}

export interface StatsStateInterface extends Stats {}
