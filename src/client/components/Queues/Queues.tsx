import React, { useEffect, useState } from 'react';
import QueuesPage from './QueuesPage';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import { IWebsocketMainStreamState } from '../../store/websocket-main-stream/state';
import { IMessageQueue } from '../../transport/http/api/common/IMessage';

const Queues = () => {
    const [queues, setQueues] = useState<IMessageQueue[]>([]);
    const { payload } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    useEffect(() => {
        const list: IMessageQueue[] = [];
        for(const ns in payload.queues)
            for (const name in payload.queues[ns]) list.push({ name, ns });
        setQueues(list);
    }, [payload]);
    return <>
        <h1 className={'display-4'}>Queues</h1>
        <QueuesPage queues={queues} />
        </>
}

export default Queues;