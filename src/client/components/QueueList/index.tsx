import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QueueListPage from './QueueListPage';
import { ApplicationStateInterface } from '../../store/contract';
import { StatsStateInterface } from '../../store/stats/contract';
import useSelector from '../../hooks/useSelector';
import { matchRouteParams } from '../../routes/routes';
import { QueueRouteParamsInterface } from '../../routes/contract';

const QueueList: React.FC<RouteComponentProps> = (props) => {
    const { queues, loading } = useSelector<ApplicationStateInterface, StatsStateInterface>((state) => state.stats);
    const params = matchRouteParams<QueueRouteParamsInterface>('queue', props.location.pathname);
    return <QueueListPage queues={queues} matchedQueueParams={params} loading={loading} />;
};

export default withRouter(QueueList);
