import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/routes/queue';
import { RouteComponentProps } from 'react-router';
import OnlineConsumers from './OnlineConsumers/OnlineConsumers';
import { consumer } from '../../routes/routes';

const Consumers: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const getOnlineStreamItemLink = useCallback((consumerId: string) => {
        return consumer.getLink({ queueName, namespace, consumerId });
    }, []);
    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Consumers
            </h1>
            <OnlineConsumers
                stream={`streamOnlineQueueConsumers:${namespace}:${queueName}`}
                getOnlineListItemLink={getOnlineStreamItemLink}
                emptyListMessage={`No consumers yet.`}
                heartbeatIdsKey={'consumers'}
            />
        </>
    );
};

export default Consumers;
