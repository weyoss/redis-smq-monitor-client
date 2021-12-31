import React from 'react';
import QueueOnlineStreamPage from './QueueOnlineStreamPage';
import { Spinner } from 'react-bootstrap';
import useWebsocketSubscription from '../../../hooks/useWebsocketSubscription';

export interface IQueueOnlineStreamProps {
    stream: string;
    namespace: string;
    queueName: string;
    getOnlineItemLink: (id: string) => string;
    noItemsMessage: string;
}
const QueueOnlineStream: React.FC<IQueueOnlineStreamProps> = ({
    stream,
    namespace,
    queueName,
    getOnlineItemLink,
    noItemsMessage
}) => {
    const { isLoading, data: online } = useWebsocketSubscription<Record<string, string>>(stream, 0);
    return isLoading ? (
        <Spinner animation={'border'} />
    ) : (
        <QueueOnlineStreamPage
            namespace={namespace}
            queueName={queueName}
            online={online}
            getOnlineItemLink={getOnlineItemLink}
            noItemsMessage={noItemsMessage}
        />
    );
};

export default QueueOnlineStream;
