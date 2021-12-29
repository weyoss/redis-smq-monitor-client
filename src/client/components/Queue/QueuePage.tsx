import React from 'react';
import * as routes from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Badge, ListGroup } from 'react-bootstrap';
import { TWebsocketMainStreamPayloadQueue } from '../../transport/websocket/streams/websocketMainStream';
import QueueRates from './QueueRates';

interface IProps {
    queue: TWebsocketMainStreamPayloadQueue | undefined;
}

const QueuePage: React.FC<IProps> = ({ queue }) => {
    if (!queue) {
        return (
            <div>
                <h2>Queue not found!</h2>
                <p>The queue you are looking for does not exists.</p>
            </div>
        );
    }
    const {
        ns,
        name,
        acknowledgedMessagesCount,
        deadLetteredMessagesCount,
        pendingMessagesCount,
        pendingMessagesWithPriorityCount,
        consumersCount,
        producersCount
    } = queue;

    return (
        <div className={'queue fullWidth'}>
            <h1 className={'display-4'}>
                {name}@{ns}
            </h1>
            <h2 className={'display-5'}>Rates</h2>
            <QueueRates namespace={ns} queueName={name} />
            <h2 className={'display-5'}>Messages</h2>
            <ListGroup horizontal className={'mb-4'}>
                <ListGroup.Item>
                    <Link
                        key={`${ns}-${name}-pending-messages`}
                        to={routes.queuePendingMessages.getLink({
                            namespace: ns,
                            queueName: name
                        })}
                    >
                        Pending messages
                        <br />
                        <Badge pill>{pendingMessagesCount}</Badge>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link
                        key={`${ns}-${name}-pending-messages-with-priority`}
                        to={routes.queuePendingMessagesWithPriority.getLink({
                            namespace: ns,
                            queueName: name
                        })}
                    >
                        Pending messages with priority
                        <br />
                        <Badge pill>{pendingMessagesWithPriorityCount}</Badge>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link
                        key={`${ns}-${name}-acknowledged-messages`}
                        to={routes.queueAcknowledgedMessages.getLink({
                            namespace: ns,
                            queueName: name
                        })}
                    >
                        Acknowledged messages
                        <br />
                        <Badge pill>{acknowledgedMessagesCount}</Badge>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link
                        key={`${ns}-${name}-dead-lettered-messages`}
                        to={routes.queueDeadLetteredMessages.getLink({
                            namespace: ns,
                            queueName: name
                        })}
                    >
                        Dead-lettered messages
                        <br />
                        <Badge pill>{deadLetteredMessagesCount}</Badge>
                    </Link>
                </ListGroup.Item>
            </ListGroup>
            <h2 className={'display-5'}>Consumers & Producers</h2>
            <ListGroup horizontal className={'mb-4'}>
                <ListGroup.Item>
                    <Link
                        key={`${ns}-${name}-producers`}
                        to={routes.queueProducers.getLink({
                            namespace: ns,
                            queueName: name
                        })}
                    >
                        Producers
                        <br />
                        <Badge pill>{producersCount}</Badge>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link
                        key={`${ns}-${name}-consumers`}
                        to={routes.queueConsumers.getLink({
                            namespace: ns,
                            queueName: name
                        })}
                    >
                        Consumers
                        <br />
                        <Badge pill>{consumersCount}</Badge>
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
};

export default QueuePage;
