import React, { useCallback } from 'react';
import { IStoreState } from '../../store/state';
import QueuePage from './QueuePage';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { IQueueRouteParams } from '../../routes/routes/queue';
import { TWebsocketMainStreamPayloadQueue } from '../../transport/websocket/streams/websocketMainStream';
import { addNotificationAction } from '../../store/notifications/action';
import { ENotificationType } from '../../store/notifications/state';
import { deleteQueue } from '../../transport/http/api/delete-queue';

const Queue: React.FC<RouteComponentProps<IQueueRouteParams>> = ({ match }) => {
    const { namespace, queueName } = match.params;
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedQueue = useSelector<IStoreState, TWebsocketMainStreamPayloadQueue>((state) => {
        const queues = state.websocketMainStream.payload.queues;
        return queues[namespace] && queues[namespace][queueName];
    });
    const deleteQueueRequestCallback = useCallback(() => deleteQueue(namespace, queueName), [namespace, queueName]);
    const onDeleteQueueSuccessCallback = useCallback(() => {
        dispatch(
            addNotificationAction(
                `Queue [${queueName}@${namespace}] has been successfully deleted.`,
                ENotificationType.SUCCESS
            )
        );
        history.push(`/`);
    }, [namespace, queueName]);
    return (
        <QueuePage
            queue={selectedQueue}
            deleteQueueRequestCallback={deleteQueueRequestCallback}
            deleteQueueRequestSuccessCallback={onDeleteQueueSuccessCallback}
        />
    );
};

export default Queue;
