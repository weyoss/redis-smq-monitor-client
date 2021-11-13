import { IStats } from '../../types/IStats';

export enum EActionType {
    SET_INITIALIZED = 'SET_INITIALIZED',
    UPDATE_STATS = 'UPDATE_STATS'
}

export function updateStatsAction(stats: IStats) {
    return {
        type: EActionType.UPDATE_STATS,
        stats
    };
}

export function setInitializedAction() {
    return {
        type: EActionType.SET_INITIALIZED
    };
}
