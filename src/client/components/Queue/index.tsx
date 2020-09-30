import React, { useEffect, useState } from 'react';
import { Queue } from '../../models/Queue';
import { ApplicationStateInterface } from '../../store/contract';
import QueuePage from './QueuePage';
import { QueuePropsInterface } from './contract';
import { Queues } from '../../models/Queues';
import { Rates } from '../../models/Rates';
import { Consumer } from '../../models/Consumer';
import { Producer } from '../../models/Producer';
import useSelector from '../../hooks/useSelector';

const Queue: React.FC<QueuePropsInterface> = ({ match }) => {
    const queues = useSelector<ApplicationStateInterface, Queues>((state) => state.stats.queues);
    const { ns, qn } = match.params;
    const selectedQueue = queues[ns] && queues[ns][qn];

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
        for (const consumerId in selectedQueue?.consumers) {
            const { rates: cRates } = selectedQueue?.consumers[consumerId] as Consumer;
            r.acknowledged += cRates.acknowledged;
            r.processing += cRates.processing;
            r.unacknowledged += cRates.unacknowledged;
        }
        for (const producerId in selectedQueue?.producers) {
            const { rates: pRates } = selectedQueue?.producers[producerId] as Producer;
            r.input += pRates.input;
        }
        updateRates(r);
    }, [selectedQueue]);

    return <QueuePage queue={selectedQueue} rates={rates} />;
};

export default Queue;
