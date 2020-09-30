import React from 'react';
import QueueListPage from './QueueListPage';
import { ApplicationStateInterface } from '../../store/contract';
import { useRouteMatch } from 'react-router';
import { activeQueueMatchParamsInterface } from './contract';
import { StatsStateInterface } from '../../store/stats/contract';
import useSelector from '../../hooks/useSelector';

const QueueList: React.FC = () => {
    const { queues, loading } = useSelector<ApplicationStateInterface, StatsStateInterface>((state) => state.stats);
    const match = useRouteMatch<activeQueueMatchParamsInterface>('/ns/:ns/qn/:qn');
    const params = match ? match.params : null;
    return <QueueListPage queues={queues} activeQueue={params} loading={loading} />;
};

export default QueueList;
