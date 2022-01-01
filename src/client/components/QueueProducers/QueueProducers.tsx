import React, { useCallback } from 'react';
import { producer } from '../../routes/routes';
import OnlineStream from '../common/OnlineStream/OnlineStream';
import { RouteComponentProps } from 'react-router';
import { IQueueRouteParams } from '../../routes/routes/queue';

const QueueProducers: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const getOnlineStreamItemLink = useCallback((producerId: string) => {
        return producer.getLink({ queueName, namespace, producerId });
    }, []);
    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Producers
            </h1>
            <OnlineStream
                stream={`streamOnlineQueueProducers:${namespace}:${queueName}`}
                getOnlineListItemLink={getOnlineStreamItemLink}
                emptyListMessage={`No producers yet.`}
                heartbeatIdsKey={'producers'}
            />
        </>
    );
};

export default QueueProducers;
