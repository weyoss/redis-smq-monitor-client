import { ActionType } from './contract';
import { Stats } from '../../models/Stats';

export function updateStats(stats: Stats) {
    return {
        type: ActionType.UPDATE_STATS,
        stats
    };
}
