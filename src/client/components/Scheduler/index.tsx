import React from 'react';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import { IStatsState } from '../../store/stats/state';
import SchedulerPage from './SchedulerPage';

const Scheduler = () => {
    const { scheduledMessages, loading } = useSelector<IStoreState, IStatsState>((state) => state.stats);
    return <SchedulerPage count={scheduledMessages} loading={loading} />;
};

export default Scheduler;
