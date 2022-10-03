import React, { useEffect, useState } from 'react';
import QueuesPage from './QueuesPage';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import { IWebsocketMainStreamState } from '../../store/websocket-main-stream/state';
import { IMessageQueue } from '../../transport/http/api/common/IMessage';
import { RouteComponentProps } from 'react-router';
import { IQueuesRouteParams } from '../../routes/routes/queues';

const Queues: React.FC<RouteComponentProps<IQueuesRouteParams>> = ({ match }) => {
    const { namespace } = match.params;
    const [queues, setQueues] = useState<IMessageQueue[]>([]);
    const { payload } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    useEffect(() => {
        const list: IMessageQueue[] = [];
        for(const ns in payload.queues)
            if (ns === namespace) for (const name in payload.queues[ns]) list.push({ name, ns });
        setQueues(list);
    }, [payload, namespace]);
    return <>
        <h1 className={'display-4'}>Queues under namespace [{namespace}]</h1>
        <QueuesPage queues={queues} namespace={namespace} />
        </>
}

export default Queues;