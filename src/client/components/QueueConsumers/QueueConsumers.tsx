import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/routes/queue';
import { RouteComponentProps } from 'react-router';
import OnlineStream from '../common/OnlineStream/OnlineStream';
import { consumer } from '../../routes/routes';

const QueueConsumers: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const getOnlineStreamItemLink = useCallback((consumerId: string) => {
        return consumer.getLink({ queueName, namespace, consumerId });
    }, []);
    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Consumers
            </h1>
            <OnlineStream
                stream={`streamOnlineQueueConsumers:${namespace}:${queueName}`}
                getOnlineItemLink={getOnlineStreamItemLink}
                noItemsMessage={`No consumers yet.`}
            />
        </>
    );
};

export default QueueConsumers;
