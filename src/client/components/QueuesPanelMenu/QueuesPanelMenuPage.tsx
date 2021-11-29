import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { IQueue } from '../../types/IQueue';
import { IQueueMap } from '../../types/IQueueMap';
import { IQueueRouteParams } from '../../routes/routes/queue';
import * as routes from '../../routes/routes';

interface IProps {
    queues: IQueueMap;
    matchedQueueParams: Partial<IQueueRouteParams> | null;
    loading: boolean;
}

const RenderData: React.FC<IProps> = ({ queues, matchedQueueParams, loading }) => {
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
                    to={routes.queue.getLink({ queueName, namespace: ns })}
                >
                    {queue.queueName}{' '}
                    <span className="badge bg-primary rounded-pill">
                        {queue.pendingMessages + queue.pendingMessagesWithPriority}
                    </span>
                </Link>
            );
        }
        data.push(
            <div key={ns} className={'mb-3'}>
                <header className={'mb-1 mx-2 d-flex justify-content-between align-items-center text-break'}>
                    {ns} <small>{li.length}</small>
                </header>
                <div className={'list-group'}>{li}</div>
            </div>
        );
    }
    if (!data.length) {
        return <p>No queues here yet.</p>;
    }
    return <>{data}</>;
};

const QueuesPanelMenuPage: React.FC<IProps> = (props) => (
    <div className={'mb-4'}>
        <h2 className={'display-5'}>Queues</h2>
        <RenderData {...props} />
    </div>
);

export default QueuesPanelMenuPage;
