import React, { useCallback, useEffect, useState } from 'react';
import { IGetQueueMessagesResponse } from '../../../api/contract';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import queryString from 'query-string';
import { generateRoutePath } from '../../../routes/routes';
import QueueMessageList from '../QueueMessageList';
import { IQueueRouteParams } from '../../../routes/contract';

interface IProps extends RouteComponentProps<IQueueRouteParams> {
    fetchQueueMessagesFn: (skip: number, take: number) => Promise<IGetQueueMessagesResponse>;
    deleteQueueMessageFn: (messageId: string, sequenceId: number) => Promise<void>;
}

const QueueMessages: React.FC<IProps> = ({ match, fetchQueueMessagesFn, deleteQueueMessageFn }) => {
    const { namespace, queueName } = match.params;
    const [messages, setMessages] = useState<IGetQueueMessagesResponse>({ total: 0, items: [] });
    const [paginationParams, setPaginationParams] = useState<{ skip: number; take: number; page: number }>({
        skip: 0,
        take: 10,
        page: 1
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [reloadMessagesTrigger, setReloadMessagesTrigger] = useState<number>(0);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        fetchQueueMessagesFn(paginationParams.skip, paginationParams.take)
            .then((data) => {
                setMessages(data);
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
    useEffect(() => {
        const { page } = queryString.parse(location.search);
        const pageNumber = typeof page === 'string' && Number(page) > 1 ? Number(page) : 1;
        if (pageNumber !== paginationParams.page) {
            const skip = (pageNumber - 1) * paginationParams.take;
            setPaginationParams({
                ...paginationParams,
                page: pageNumber,
                skip
            });
        }
    }, [location.search]);
    const onPageChange = useCallback((page: number) => {
        history.push(`${generateRoutePath('queuePendingMessages', { queueName, namespace })}?page=${page}`);
    }, []);
    const onMessageDelete = useCallback((messageId: string, sequenceId: number) => {
        setLoading(true);
        deleteQueueMessageFn(messageId, sequenceId)
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
    }, []);
    return (
        <QueueMessageList
            messages={messages}
            loading={loading}
            pageParams={paginationParams}
            onPageChange={onPageChange}
            onMessageDelete={onMessageDelete}
        />
    );
};

export default withRouter(QueueMessages);
