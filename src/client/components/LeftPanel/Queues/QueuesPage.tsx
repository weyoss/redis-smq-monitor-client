import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../../routes/routes';
import { TWebsocketMainStreamPayload } from '../../../transport/websocket/streams/websocketMainStream';

interface IProps {
    websocketMainStreamPayload: TWebsocketMainStreamPayload;
    selectedNamespace: string | undefined;
}

const QueuesPage: React.FC<IProps> = ({ websocketMainStreamPayload, selectedNamespace }) => {
    const data = [];
    for (const ns in websocketMainStreamPayload.queues) {
        const totalQueues = Object.keys(websocketMainStreamPayload.queues[ns]).length;
        const className = selectedNamespace === ns ? 'active ' : '';
        data.push(
            <Link
                key={ns}
                className={`${className}text-break list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
                to={routes.queues.getLink({ namespace: ns })}
            >
                {ns} <span className="badge bg-primary rounded-pill">{totalQueues} queue(s)</span>
            </Link>
        );
    }
    return <div className={'mb-4'}>{
        data.length?
        <div className={'list-group'}>{data}</div> :
        <p>No queues here yet.</p>
    }
    </div>
};

export default QueuesPage;
