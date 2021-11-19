import React from 'react';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import { IStatsState } from '../../store/stats/state';
import SchedulerPanelMenuPage from './SchedulerPanelMenuPage';

const SchedulerPanelMenu = () => {
    const { scheduledMessages, loading } = useSelector<IStoreState, IStatsState>((state) => state.stats);
    return <SchedulerPanelMenuPage count={scheduledMessages} loading={loading} />;
};

export default SchedulerPanelMenu;
