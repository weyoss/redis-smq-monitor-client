import { IStats } from '../../types/IStats';

export interface IStatsState extends IStats {
    loading: boolean;
    init: boolean;
}

export const initialStatsState: IStatsState = {
    loading: true,
    init: true,
    rates: {
        input: 0,
        processing: 0,
        acknowledged: 0,
        unacknowledged: 0
    },
    queues: {}
};
