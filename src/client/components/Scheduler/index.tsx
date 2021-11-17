import React from 'react';
import useSelector from '../../hooks/useSelector';
import { IApplicationState } from '../../store/contract';
import { IStatsState } from '../../store/stats/state';
import SchedulerPage from './SchedulerPage';

const Scheduler = () => {
    const { scheduledMessages, loading } = useSelector<IApplicationState, IStatsState>((state) => state.stats);
    return <SchedulerPage count={scheduledMessages} loading={loading} />;
};

export default Scheduler;
