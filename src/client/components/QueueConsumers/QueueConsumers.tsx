import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/routes/queue';
import { RouteComponentProps } from 'react-router';
import QueueConsumersListing from './QueueConsumersListing/QueueConsumersListing';
import { consumer } from '../../routes/routes';

const QueueConsumers: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const getConsumerLink = useCallback((consumerId: string) => {
        return consumer.getLink({ queueName, namespace, consumerId });
    }, []);
    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Consumers
            </h1>
            <QueueConsumersListing
                queueConsumersStreamName={`streamQueueConsumers:${namespace}:${queueName}`}
                queueOnlineConsumersStreamName={`streamQueueOnlineConsumers:${namespace}:${queueName}`}
                getConsumerLink={getConsumerLink}
                emptyListMessage={`No consumers yet.`}
            />
        </>
    );
};

export default QueueConsumers;
