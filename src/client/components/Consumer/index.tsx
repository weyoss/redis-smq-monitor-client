import React from 'react';
import useSelector from '../../hooks/useSelector';
import { ApplicationStateInterface } from '../../store/contract';
import { Consumer } from '../../models/Consumer';
import { ConsumerPropsInterface } from './contract';
import ConsumerPage from './ConsumerPage';

const Consumer: React.FC<ConsumerPropsInterface> = ({ match }) => {
    const { namespace, queueName, consumerId } = match.params;
    const consumer = useSelector<ApplicationStateInterface, Consumer | undefined>((state) => {
        const queues = state.stats.queues;
        return queues[namespace] && queues[namespace][queueName] && queues[namespace][queueName].consumers[consumerId];
    });
    return <ConsumerPage consumer={consumer} />;
};

export default Consumer;
