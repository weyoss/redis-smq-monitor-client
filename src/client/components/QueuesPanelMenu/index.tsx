import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QueuesPanelMenuPage from './QueuesPanelMenuPage';
import { IStoreState } from '../../store/state';
import useSelector from '../../hooks/useSelector';
import { matchRoute } from '../../routes/common';
import { IWebsocketMainStreamState } from '../../store/websocketMainStream/state';

const QueuesPanelMenu: React.FC<RouteComponentProps> = (props) => {
    const { payload, loading } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    // This component is not a child of the Router, so we can not access current route parameters.
    // This is a workaround to get the parameters.
    const match = matchRoute(props.location.pathname);
    const params = match?.params ?? {};
    return <QueuesPanelMenuPage websocketMainStreamPayload={payload} matchedQueueParams={params} loading={loading} />;
};

export default withRouter(QueuesPanelMenu);
