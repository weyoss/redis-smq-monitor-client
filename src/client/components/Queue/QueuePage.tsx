import React from 'react';
import * as routes from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Badge, ListGroup } from 'react-bootstrap';
import { TWebsocketMainStreamPayloadQueue } from '../../transport/websocket/streams/websocketMainStream';
import QueueRates from './QueueRates';
import { TQueryRequest } from '../../hooks/useQuery';
import SButton from '../common/SButton/SButton';
import QueueRateLimiting from './QueueRateLimiting';

interface IProps {
    queue: TWebsocketMainStreamPayloadQueue | undefined;
    deleteQueueRequestCallback: TQueryRequest<void>;
    deleteQueueRequestSuccessCallback: () => void;
}

const QueuePage: React.FC<IProps> = ({ queue, deleteQueueRequestCallback, deleteQueueRequestSuccessCallback }) => {
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
        consumersCount
    } = queue;

    return (
        <div className={'queue fullWidth'}>
            <h1 className={'display-4'}>
                {name}@{ns}
            </h1>
            <div className={'mb-3 d-flex flex-row-reverse'}>
                <SButton
                    variant={'outline-danger'}
                    onSuccess={deleteQueueRequestSuccessCallback}
                    request={deleteQueueRequestCallback}
                    btnCaption={'Delete queue'}
                    modalBody={
                        <p>
                            Are you sure you want to delete this message queue?
                            <br />
                            <br />
                            The queue will be deleted from the system alongside with its messages (acknowledged,
                            pending, dead-lettered).
                            <br />
                            <br />
                            Before confirming, make sure that this queue is not used by a consumer or a producer.
                        </p>
                    }
                    modalTitle={'Queue Deletion'}
                />
            </div>
            <h2 className={'display-5'}>Rates</h2>
            <QueueRates namespace={ns} queueName={name} />
            <h2 className={'display-5'}>Queue Rate Limiting</h2>
            <QueueRateLimiting name={name} ns={ns} />
            <h2 className={'display-5'}>Messages</h2>
            <ListGroup horizontal className={'mb-4'}>
                <Link
                    className={'list-group-item list-group-item-action'}
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
                <Link
                    className={'list-group-item list-group-item-action'}
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
                <Link
                    className={'list-group-item list-group-item-action'}
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
                <Link
                    className={'list-group-item list-group-item-action'}
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
            </ListGroup>
            <h2 className={'display-5'}>Consumers</h2>
            <ListGroup className={'mb-4'}>
                <Link
                    className={'list-group-item list-group-item-action w-25'}
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
            </ListGroup>
        </div>
    );
};

export default QueuePage;
