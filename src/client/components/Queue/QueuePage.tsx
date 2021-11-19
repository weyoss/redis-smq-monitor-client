import React from 'react';
import ConsumerList from './ConsumerList';
import ProducerList from './ProducerList';
import RatesChart from '../common/RatesChart';
import { generateRoutePath } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Badge, ListGroup } from 'react-bootstrap';
import { IQueue } from '../../types/IQueue';
import { IRates } from '../../types/IRates';

interface IProps {
    queue: IQueue | undefined;
    rates: IRates;
}

const QueuePage: React.FC<IProps> = ({ queue, rates }) => {
    if (!queue) {
        return (
            <div>
                <h2>Queue not found!</h2>
                <p>The queue you are looking for does not exists.</p>
            </div>
        );
    }
    const {
        namespace,
        queueName,
        acknowledgedMessages,
        deadLetteredMessages,
        pendingMessages,
        pendingMessagesWithPriority,
        consumers,
        producers
    } = queue;

    return (
        <div className={'queue fullWidth'}>
            <h1 className={'display-4'}>
                {queueName}@{namespace}
            </h1>
            <ListGroup horizontal className={'mb-4'}>
                <ListGroup.Item>
                    <Link
                        key={`${namespace}-${queueName}-pending-messages`}
                        to={generateRoutePath('queuePendingMessages', {
                            namespace,
                            queueName
                        })}
                    >
                        Pending messages
                        <br />
                        <Badge pill>{pendingMessages}</Badge>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link
                        key={`${namespace}-${queueName}-pending-messages-with-priority`}
                        to={generateRoutePath('queuePendingMessagesWithPriority', {
                            namespace,
                            queueName
                        })}
                    >
                        Pending messages with priority
                        <br />
                        <Badge pill>{pendingMessagesWithPriority}</Badge>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link
                        key={`${namespace}-${queueName}-acknowledged-messages`}
                        to={generateRoutePath('queueAcknowledgedMessages', {
                            namespace,
                            queueName
                        })}
                    >
                        Acknowledged messages
                        <br />
                        <Badge pill>{acknowledgedMessages}</Badge>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link
                        key={`${namespace}-${queueName}-dead-lettered-messages`}
                        to={generateRoutePath('queueDeadLetteredMessages', {
                            namespace,
                            queueName
                        })}
                    >
                        Dead-lettered messages
                        <br />
                        <Badge pill>{deadLetteredMessages}</Badge>
                    </Link>
                </ListGroup.Item>
            </ListGroup>
            <h3 className={'display-6'}>Queue Rates</h3>
            <RatesChart rates={rates} scope={`${namespace}-${queueName}`} />
            <h3 className={'display-6'}>Consumers</h3>
            <ConsumerList consumers={consumers} />
            <h3 className={'display-6'}>Producers</h3>
            <ProducerList producers={producers} />
        </div>
    );
};

export default QueuePage;
