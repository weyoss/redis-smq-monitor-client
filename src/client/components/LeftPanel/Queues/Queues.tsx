import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import QueuesPage from './QueuesPage';
import { IStoreState } from '../../../store/state';
import useSelector from '../../../hooks/useSelector';
import { IWebsocketMainStreamState } from '../../../store/websocket-main-stream/state';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { useDispatch } from 'react-redux';
import { deleteNamespace } from '../../../transport/http/api';
import { useParams } from '../../../hooks/useParams';
import { queue } from '../../../routes/routes';

const Queues = () => {
    const { payload } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const deleteNamespaceRequestCallback = useCallback((ns: string) => () => deleteNamespace(ns), [payload]);
    const deleteNamespaceRequestSuccessCallback = useCallback(() => {
        dispatch(addNotificationAction(`Namespace has been successfully deleted.`, ENotificationType.SUCCESS));
        history.push('/');
    }, [payload]);
    // This component is not a child of the Router, so we can not access current route parameters.
    // This is a workaround to get the parameters.
    const params = useParams(queue.path);
    return (
        <QueuesPage
            deleteNamespaceRequestCallback={deleteNamespaceRequestCallback}
            deleteNamespaceRequestSuccessCallback={deleteNamespaceRequestSuccessCallback}
            websocketMainStreamPayload={payload}
            matchedQueueParams={params}
        />
    );
};

export default Queues;
