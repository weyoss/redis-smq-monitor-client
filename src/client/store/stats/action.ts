import { EActionType } from './contract';
import { IStats } from '../../types/IStats';

export function updateStats(stats: IStats) {
    return {
        type: EActionType.UPDATE_STATS,
        stats
    };
}
