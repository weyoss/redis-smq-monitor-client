import React, { useEffect, useState } from 'react';
import { ApplicationStateInterface } from '../../store/contract';
import QueuePage from './QueuePage';
import { QueuePropsInterface } from './contract';
import { Rates } from '../../models/Rates';
import { Consumer } from '../../models/Consumer';
import { Producer } from '../../models/Producer';
import useSelector from '../../hooks/useSelector';
import { Queue } from '../../models/Queue';

const Queue: React.FC<QueuePropsInterface> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const queue = useSelector<ApplicationStateInterface, Queue | undefined>((state) => {
        const queues = state.stats.queues;
        return queues[namespace] && queues[namespace][queueName];
    });

    const [rates, updateRates] = useState<Rates>({
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
            const { rates: cRates } = queue?.consumers[consumerId] as Consumer;
            r.acknowledged += cRates.acknowledged;
            r.processing += cRates.processing;
            r.unacknowledged += cRates.unacknowledged;
        }
        for (const producerId in queue?.producers) {
            const { rates: pRates } = queue?.producers[producerId] as Producer;
            r.input += pRates.input;
        }
        updateRates(r);
    }, [queue]);

    return <QueuePage queue={queue} rates={rates} />;
};

export default Queue;
