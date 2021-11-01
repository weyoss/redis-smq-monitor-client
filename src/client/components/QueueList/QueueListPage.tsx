import React from 'react';
import { QueueListPagePropsInterface } from './contract';
import { Link } from 'react-router-dom';
import { Queue } from '../../models/Queue';
import { generateRoutePath } from '../../routes/routes';

import './style.css';
import Spinner from '../Spinner';

const List: React.FC<QueueListPagePropsInterface> = ({ queues, matchedQueueParams, loading }) => {
    if (loading) {
        return <Spinner loading={loading} />;
    }
    const data = [];
    for (const ns in queues) {
        const nsQueues = queues[ns];
        const li = [];
        for (const queueName in nsQueues) {
            const queue = nsQueues[queueName] as Queue;
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
                    <span className="badge badge-primary badge-pill">
                        {queue.pendingMessages + queue.pendingMessagesWithPriority}
                    </span>
                </Link>
            );
        }
        data.push(
            <div key={ns} className={'nsGroup'}>
                <h5 className={'d-flex justify-content-between align-items-center text-break'}>
                    {ns} <span className="badge">{li.length}</span>
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

const QueueListPage: React.FC<QueueListPagePropsInterface> = (props) => (
    <div className={'queueList'}>
        <h2>Queues</h2>
        <List {...props} />
    </div>
);

export default QueueListPage;
