import React from 'react';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import { IConsumer } from '../../types/IConsumer';
import ConsumerPage from './ConsumerPage';
import { RouteComponentProps } from 'react-router';
import { IConsumerRouteParams } from '../../routes/contract';

interface IProps extends RouteComponentProps<IConsumerRouteParams> {}

const Consumer: React.FC<IProps> = ({ match }) => {
    const { namespace, queueName, consumerId } = match.params;
    const consumer = useSelector<IStoreState, IConsumer | undefined>((state) => {
        const queues = state.stats.queues;
        return queues[namespace] && queues[namespace][queueName] && queues[namespace][queueName].consumers[consumerId];
    });
    return <ConsumerPage consumer={consumer} namespace={namespace} queueName={queueName} />;
};

export default Consumer;
