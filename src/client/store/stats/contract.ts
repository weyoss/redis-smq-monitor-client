import { IStats } from '../../types/IStats';

export enum EActionType {
    UPDATE_STATS = 'UPDATE_STATS'
}

export interface IStatsState extends IStats {
    loading: boolean;
}
