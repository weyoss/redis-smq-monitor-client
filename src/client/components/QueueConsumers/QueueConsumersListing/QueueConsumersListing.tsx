import React from 'react';
import QueueConsumersListingPage from './QueueConsumersListingPage';
import { Spinner } from 'react-bootstrap';
import useWebsocketSubscription from '../../../hooks/useWebsocketSubscription';
import { TQueueOnlineConsumersStreamPayload } from '../../../transport/websocket/streams/queueOnlineConsumersStream';

export interface IQueueConsumersListingProps {
    queueConsumersStreamName: string;
    queueOnlineConsumersStreamName: string;
    getConsumerLink: (id: string) => string;
    emptyListMessage: string;
}
const QueueConsumersListing: React.FC<IQueueConsumersListingProps> = ({
    queueConsumersStreamName,
    queueOnlineConsumersStreamName,
    getConsumerLink,
    emptyListMessage,
}) => {
    const { isLoading: isQueueConsumersStreamLoading, data: queueConsumersStreamPayload } = useWebsocketSubscription<Record<string, string>>(queueConsumersStreamName, 0);
    const { isLoading: isQueueOnlineConsumersStreamLoading, data: queueOnlineConsumersStreamPayload } = useWebsocketSubscription<
        TQueueOnlineConsumersStreamPayload
    >(queueOnlineConsumersStreamName, 0);
    return isQueueConsumersStreamLoading || isQueueOnlineConsumersStreamLoading ? (
        <Spinner animation={'border'} />
    ) : (
        <QueueConsumersListingPage
            queueConsumers={queueConsumersStreamPayload ?? {}}
            getConsumerLink={getConsumerLink}
            emptyListMessage={emptyListMessage}
            onlineConsumerIds={queueOnlineConsumersStreamPayload ? queueOnlineConsumersStreamPayload.ids : []}
        />
    );
};

export default QueueConsumersListing;
