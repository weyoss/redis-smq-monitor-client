import React from 'react';
import { Link } from 'react-router-dom';
import { generateRoutePath } from '../../routes/routes';
import { Spinner } from 'react-bootstrap';
import { IQueue } from '../../types/IQueue';
import { IQueueRouteParams } from '../../routes/contract';
import { IQueueMap } from '../../types/IQueueMap';

interface IProps {
    queues: IQueueMap;
    matchedQueueParams: Partial<IQueueRouteParams> | null;
    loading: boolean;
}

const Render: React.FC<IProps> = ({ queues, matchedQueueParams, loading }) => {
    if (loading) {
        return <Spinner animation={'border'} />;
    }
    const data = [];
    for (const ns in queues) {
        const nsQueues = queues[ns];
        const li = [];
        for (const queueName in nsQueues) {
            const queue = nsQueues[queueName] as IQueue;
            const isActiveQueue =
                matchedQueueParams &&
                matchedQueueParams.queueName === queue.queueName &&
                matchedQueueParams.namespace === queue.namespace;
            const className = isActiveQueue ? 'active ' : '';
            li.push(
                <Link
                    key={`${ns}-${queueName}`}
                    className={`${className}text-break list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
                    to={generateRoutePath('queue', { queueName, namespace: ns })}
                >
                    {queue.queueName}{' '}
                    <span className="badge bg-primary rounded-pill">
                        {queue.pendingMessages + queue.pendingMessagesWithPriority}
                    </span>
                </Link>
            );
        }
        data.push(
            <div key={ns} className={'mb-5'}>
                <h5 className={'d-flex justify-content-between align-items-center text-break'}>
                    {ns} <small>{li.length}</small>
                </h5>
                <div className={'list-group'}>{li}</div>
            </div>
        );
    }
    if (!data.length) {
        return <p>No existing queues yet.</p>;
    }
    return <>{data}</>;
};

const QueueListPage: React.FC<IProps> = (props) => (
    <div className={'queueList'}>
        <h2>Queues</h2>
        <Render {...props} />
    </div>
);

export default QueueListPage;
