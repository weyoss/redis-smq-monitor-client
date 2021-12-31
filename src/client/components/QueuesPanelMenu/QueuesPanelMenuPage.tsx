import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { IQueueRouteParams } from '../../routes/routes/queue';
import * as routes from '../../routes/routes';
import { TWebsocketMainStreamPayload } from '../../transport/websocket/streams/websocketMainStream';

interface IProps {
    websocketMainStreamPayload: TWebsocketMainStreamPayload;
    matchedQueueParams: Partial<IQueueRouteParams> | null;
    loading: boolean;
}

const RenderData: React.FC<IProps> = ({ websocketMainStreamPayload, matchedQueueParams, loading }) => {
    if (loading) {
        return <Spinner animation={'border'} />;
    }
    const data = [];
    for (const ns in websocketMainStreamPayload.queues) {
        const nsQueues = websocketMainStreamPayload.queues[ns];
        const li = [];
        for (const queueName in nsQueues) {
            const queue = nsQueues[queueName];
            const isActiveQueue =
                matchedQueueParams &&
                matchedQueueParams.queueName === queue.name &&
                matchedQueueParams.namespace === queue.ns;
            const className = isActiveQueue ? 'active ' : '';
            li.push(
                <Link
                    key={`${ns}-${queueName}`}
                    className={`${className}text-break list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
                    to={routes.queue.getLink({ queueName, namespace: ns })}
                >
                    {queue.name}{' '}
                    <span className="badge bg-primary rounded-pill">
                        {queue.pendingMessagesCount + queue.pendingMessagesWithPriorityCount}
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
        <h2 className={'display-6'}>Queues</h2>
        <RenderData {...props} />
    </div>
);

export default QueuesPanelMenuPage;
