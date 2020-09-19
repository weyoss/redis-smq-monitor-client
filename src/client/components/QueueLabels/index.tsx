import React from 'react';
import QueueLabelsPage from './QueueLabelsPage';
import { useSelector } from 'react-redux';
import { ApplicationStateInterface } from '../../store/contract';
import { Queues } from '../../models/Queues';
import { useRouteMatch } from 'react-router';
import { activeQueueMatchParamsInterface } from './contract';

const QueueLabels: React.FC = () => {
    const queues = useSelector<ApplicationStateInterface, Queues>((state) => state.stats.queues);
    const match = useRouteMatch<activeQueueMatchParamsInterface>('/ns/:ns/qn/:qn');
    const params = match ? match.params : null;
    return <QueueLabelsPage queues={queues} activeQueue={params} />;
};

export default QueueLabels;
