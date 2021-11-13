import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QueueListPage from './QueueListPage';
import { IApplicationState } from '../../store/contract';
import { IStatsState } from '../../store/stats/state';
import useSelector from '../../hooks/useSelector';
import { matchRouteParams } from '../../routes/routes';
import { IQueueRouteParams } from '../../routes/contract';

const QueueList: React.FC<RouteComponentProps> = (props) => {
    const { queues, loading } = useSelector<IApplicationState, IStatsState>((state) => state.stats);
    const params = matchRouteParams<IQueueRouteParams>('queue', props.location.pathname);
    return <QueueListPage queues={queues} matchedQueueParams={params} loading={loading} />;
};

export default withRouter(QueueList);
