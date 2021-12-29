import React from 'react';
import { IStoreState } from '../../store/state';
import QueuePage from './QueuePage';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IQueueRouteParams } from '../../routes/routes/queue';
import { TWebsocketMainStreamPayloadQueue } from '../../transport/websocket/streams/websocketMainStream';

const Queue: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const selectedQueue = useSelector<IStoreState, TWebsocketMainStreamPayloadQueue>((state) => {
        const queues = state.websocketMainStream.payload.queues;
        return queues[namespace] && queues[namespace][queueName];
    });
    return <QueuePage queue={selectedQueue} />;
};

export default Queue;
