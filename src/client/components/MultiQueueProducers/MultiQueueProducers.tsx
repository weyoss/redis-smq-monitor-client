import React, { useCallback } from 'react';
import OnlineStream from '../common/OnlineStream/OnlineStream';
import { multiQueueProducer } from '../../routes/routes';

const MultiQueueProducers: React.FC = () => {
    const getOnlineStreamItemLink = useCallback((producerId: string) => {
        return multiQueueProducer.getLink({ producerId });
    }, []);
    return (
        <>
            <h1 className={'display-4'}>Multi-Queue Producers</h1>
            <OnlineStream
                stream={`streamOnlineMultiQueueProducers`}
                getOnlineListItemLink={getOnlineStreamItemLink}
                emptyListMessage={`No producers yet.`}
                heartbeatIdsKey={'multiQueueProducers'}
            />
        </>
    );
};

export default MultiQueueProducers;
