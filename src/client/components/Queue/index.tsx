import React, { useEffect, useState } from 'react';
import { IStoreState } from '../../store/state';
import QueuePage from './QueuePage';
import { IRates } from '../../types/IRates';
import { IConsumer } from '../../types/IConsumer';
import { IProducer } from '../../types/IProducer';
import { useSelector } from 'react-redux';
import { IQueue } from '../../types/IQueue';
import { RouteComponentProps } from 'react-router';
import { IQueueRouteParams } from '../../routes/contract';

export interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const Queue: React.FC<IProps> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const queue = useSelector<IStoreState, IQueue | undefined>((state) => {
        const queues = state.stats.queues;
        return queues[namespace] && queues[namespace][queueName];
    });

    const [rates, updateRates] = useState<IRates>({
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
        for (const consumerId in queue?.consumers) {
            const { rates: cRates } = queue?.consumers[consumerId] as IConsumer;
            r.acknowledged += cRates.acknowledged;
            r.processing += cRates.processing;
            r.unacknowledged += cRates.unacknowledged;
        }
        for (const producerId in queue?.producers) {
            const { rates: pRates } = queue?.producers[producerId] as IProducer;
            r.input += pRates.input;
        }
        updateRates(r);
    }, [queue]);

    return <QueuePage queue={queue} rates={rates} />;
};

export default Queue;
