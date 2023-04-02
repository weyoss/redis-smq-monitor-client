import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/routes/queue';
import { RouteComponentProps } from 'react-router';
import { consumer } from '../../routes/routes';
import useWebsocketSubscription from '../../hooks/useWebsocketSubscription';
import { TQueueOnlineConsumersStreamPayload } from '../../transport/websocket/streams/queueOnlineConsumersStream';
import QueueConsumersPage from './QueueConsumersPage';

const QueueConsumers: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const getConsumerLink = useCallback((consumerId: string) => {
        return consumer.getLink({ queueName, namespace, consumerId });
    }, []);
    const { isLoading: isQueueConsumersStreamLoading, data: queueConsumersStreamPayload } = useWebsocketSubscription<Record<string, string>>(`streamQueueConsumers:${namespace}:${queueName}`, 0);
    const { isLoading: isQueueOnlineConsumersStreamLoading, data: queueOnlineConsumersStreamPayload } = useWebsocketSubscription<
        TQueueOnlineConsumersStreamPayload
        >(`streamQueueOnlineConsumers:${namespace}:${queueName}`, 0);
    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Consumers
            </h1>
            <QueueConsumersPage
                getConsumerLink={getConsumerLink}
                isQueueConsumersStreamLoading={isQueueConsumersStreamLoading}
                isQueueOnlineConsumersStreamLoading={isQueueOnlineConsumersStreamLoading}
                queueConsumers={queueConsumersStreamPayload ?? {}}
                onlineConsumers={queueOnlineConsumersStreamPayload ?? { ids: [] }}
            />
        </>
    );
};

export default QueueConsumers;
