import React from 'react';
import QueuesPage from './QueuesPage';
import { IStoreState } from '../../../store/state';
import useSelector from '../../../hooks/useSelector';
import { IWebsocketMainStreamState } from '../../../store/websocket-main-stream/state';
import { useParams } from '../../../hooks/useParams';
import { queue, queues } from '../../../routes/routes';
import { IQueuesRouteParams } from '../../../routes/routes/queues';
import { IQueueRouteParams } from '../../../routes/routes/queue';

const Queues = () => {
    const { payload } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    // This component is not a child of the Router, so we can not access current route parameters.
    // This is a workaround to get the parameters.
    const params: Partial<IQueuesRouteParams> | Partial<IQueueRouteParams> | undefined = useParams(queues.path) || useParams(queue.path) ;
    return (
        <>
            <h2 className={'display-6'}>Queues</h2>
            <QueuesPage
            websocketMainStreamPayload={payload}
            selectedNamespace={params?.namespace} />
        </>
    );
};

export default Queues;
