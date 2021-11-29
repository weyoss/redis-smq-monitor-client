import React, { useEffect, useState } from 'react';
import { IStoreState } from '../../store/state';
import QueuePage from './QueuePage';
import { IRates } from '../../types/IRates';
import { IConsumer } from '../../types/IConsumer';
import { IProducer } from '../../types/IProducer';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IQueue } from '../../types/IQueue';
import { IQueueRouteParams } from '../../routes/routes/queue';

const Queue: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const selectedQueue = useSelector<IStoreState, IQueue>((state) => {
        return state.stats.queues[namespace] && state.stats.queues[namespace][queueName];
    });
    const [rates, setRates] = useState<IRates>({
        processing: 0,
        input: 0,
        acknowledged: 0,
        unacknowledged: 0
    });
    useEffect(() => {
        let r = {
            processing: 0,
            input: 0,
            acknowledged: 0,
            unacknowledged: 0
        };
        for (const consumerId in selectedQueue?.consumers) {
            const { rates: cRates } = selectedQueue?.consumers[consumerId] as IConsumer;
            r.acknowledged += cRates.acknowledged;
            r.processing += cRates.processing;
            r.unacknowledged += cRates.unacknowledged;
        }
        for (const producerId in selectedQueue?.producers) {
            const { rates: pRates } = selectedQueue?.producers[producerId] as IProducer;
            r.input += pRates.input;
        }
        setRates(r);
    }, [selectedQueue]);

    return <QueuePage queue={selectedQueue} rates={rates} />;
};

export default Queue;
