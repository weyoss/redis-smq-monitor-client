import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QueuesPanelMenuPage from './QueuesPanelMenuPage';
import { IStoreState } from '../../store/state';
import { IStatsState } from '../../store/stats/state';
import useSelector from '../../hooks/useSelector';
import { matchRoute } from '../../routes/routes';

const QueuesPanelMenu: React.FC<RouteComponentProps> = (props) => {
    const { queues, loading } = useSelector<IStoreState, IStatsState>((state) => state.stats);
    // This component is not a child of the Router, so we can not access current route parameters.
    // This is a workaround to get the parameters.
    const match = matchRoute(props.location.pathname);
    const params = match?.params ?? {};
    return <QueuesPanelMenuPage queues={queues} matchedQueueParams={params} loading={loading} />;
};

export default withRouter(QueuesPanelMenu);
