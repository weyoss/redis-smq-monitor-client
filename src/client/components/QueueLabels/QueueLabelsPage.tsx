import React from 'react';
import { QueueLabelsPagePropsInterface } from './contract';
import { Link } from 'react-router-dom';
import { Queue } from '../../models/Queue';

import './style.css';

const Labels: React.FC<QueueLabelsPagePropsInterface> = ({ queues, activeQueue }) => {
    const data = [];
    for (const ns in queues) {
        const nsQueues = queues[ns];
        const li = [];
        for (const queueName in nsQueues) {
            const queue = nsQueues[queueName] as Queue;
            const key = `${ns}-${queueName}`;
            const isActiveQueue = activeQueue && activeQueue.qn === queue.name && activeQueue.ns === queue.namespace;
            const className = isActiveQueue ? 'active' : 'inactive';
            li.push(
                <li key={key}>
                    <Link className={className} to={`/ns/${ns}/qn/${queueName}`}>
                        {queue.name} ({queue.size})
                    </Link>
                </li>
            );
        }
        data.push(
            <li key={ns}>
                <span>
                    {ns} ({li.length})
                </span>
                <ul className={'embedded'}>{li}</ul>
            </li>
        );
    }
    if (!data.length) {
        return <p>No existing queues yet.</p>;
    }
    return <ul>{data}</ul>;
};

const QueueLabelsPage: React.FC<QueueLabelsPagePropsInterface> = ({ queues, activeQueue }) => (
    <div className={'queueLabels fullWidth'}>
        <h2>Queues</h2>
        <Labels queues={queues} activeQueue={activeQueue} />
    </div>
);

export default QueueLabelsPage;
