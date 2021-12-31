import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IProducerRouteParams } from '../../routes/routes/producer';
import useWebsocketSubscription from '../../hooks/useWebsocketSubscription';
import { TWebsocketHeartbeatStreamPayload } from '../../transport/websocket/streams/websocketHeartbeatStream';
import ProducerPage from './ProducerPage';

const Producer: React.FC<RouteComponentProps<IProducerRouteParams>> = ({ match }) => {
    const { producerId } = match.params;
    const { isLoading, data } = useWebsocketSubscription<TWebsocketHeartbeatStreamPayload>(
        `streamProducerHeartbeat:${producerId}`,
        5000
    );
    return <ProducerPage heartbeat={data} isLoading={isLoading} {...match.params} />;
};

export default Producer;
