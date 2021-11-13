import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import React, { useEffect, useState } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import { deleteQueuePendingMessage, getQueuePendingMessages } from '../../api/api';
import { IGetQueuePendingMessagesResponse } from '../../api/contract';
import { generateRoutePath } from '../../routes/routes';
import queryString from 'query-string';
import MessageList from '../common/MessageList';
import { useDispatch } from 'react-redux';
import { addNotificationAction } from '../../store/notifications/action';
import { ENotificationType } from '../../store/notifications/state';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueuePendingMessages: React.FC<IProps> = ({ match, location }) => {
    const { namespace, queueName } = match.params;
    const [messages, setMessages] = useState<IGetQueuePendingMessagesResponse>({ total: 0, items: [] });
    const [paginationParams, setPaginationParams] = useState<{ skip: number; take: number }>({ skip: 0, take: 10 });
    const [loading, setLoading] = useState<boolean>(true);
    const [reloadMessagesTrigger, setReloadMessagesTrigger] = useState<number>(0);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        getQueuePendingMessages(namespace, queueName, paginationParams.skip, paginationParams.take)
            .then((data) => {
                setMessages(data);
                console.log(data);
            })
            .catch((e) => {
                dispatch(
                    addNotificationAction(
                        'An error occurred while fetching pending messages. Check if your Web UI server is running and try again.',
                        ENotificationType.ERROR
                    )
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [paginationParams, reloadMessagesTrigger]);
    const onPageChange = (page: number) => {
        history.push(`${generateRoutePath('queuePendingMessages', { queueName, namespace })}?page=${page}`);
    };
    const onMessageDelete = (messageId: string, sequenceId: number) => {
        setLoading(true);
        deleteQueuePendingMessage(namespace, queueName, messageId, sequenceId)
            .then(() => {
                dispatch(
                    addNotificationAction(
                        `Message ID ${messageId} has been successfully deleted.`,
                        ENotificationType.SUCCESS
                    )
                );
                setReloadMessagesTrigger(reloadMessagesTrigger + 1);
            })
            .catch((e) => {
                dispatch(
                    addNotificationAction(
                        'An error occurred while trying to delete the message ID ' +
                            messageId +
                            ', with sequence ' +
                            'ID ' +
                            sequenceId +
                            ' from queue ' +
                            queueName +
                            ' under namespace ' +
                            namespace +
                            '. If your the Web UI ' +
                            'server is up and running, then maybe this is a race condition error and the message has been ' +
                            'already deleted. Refresh your page and try again.',
                        ENotificationType.ERROR
                    )
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const { page } = queryString.parse(location.search);
    const skip = (typeof page === 'string' && Number(page) > 1 ? Number(page) : 1) - 1;
    if (skip !== paginationParams.skip) {
        setPaginationParams({
            ...paginationParams,
            skip
        });
    }
    return (
        <>
            <h2>
                {queueName}@{namespace} / Pending messages
            </h2>
            <MessageList
                messages={messages}
                loading={loading}
                skip={paginationParams.skip}
                take={paginationParams.take}
                onPageChange={onPageChange}
                onMessageDelete={onMessageDelete}
            />
        </>
    );
};

export default withRouter(QueuePendingMessages);
