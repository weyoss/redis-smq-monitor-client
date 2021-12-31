import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IProducerRouteParams } from '../../routes/routes/producer';
import useWebsocketSubscription from '../../hooks/useWebsocketSubscription';
import { TWebsocketHeartbeatStreamPayload } from '../../transport/websocket/streams/websocketHeartbeatStream';
import MultiQueueProducerPage from './MultiQueueProducerPage';

const MultiQueueProducer: React.FC<RouteComponentProps<IProducerRouteParams>> = ({ match }) => {
    const { producerId } = match.params;
    const { isLoading, data } = useWebsocketSubscription<TWebsocketHeartbeatStreamPayload>(
        `streamMultiQueueProducerHeartbeat:${producerId}`,
        5000
    );
    return <MultiQueueProducerPage heartbeat={data} isLoading={isLoading} {...match.params} />;
};

export default MultiQueueProducer;
