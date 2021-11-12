import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import React, { useEffect, useState } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import { deleteQueuePendingMessage, getQueuePendingMessages } from '../../api/api';
import { IGetQueuePendingMessagesResponse } from '../../api/contract';
import QueuePendingMessagesPage from './QueuePendingMessagesPage';
import { generateRoutePath } from '../../routes/routes';
import queryString from 'query-string';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueuePendingMessages: React.FC<IProps> = ({ match, location }) => {
    const { namespace, queueName } = match.params;
    const [messages, setMessages] = useState<IGetQueuePendingMessagesResponse>({ total: 0, items: [] });
    const [paginationParams, setPaginationParams] = useState<{ skip: number; take: number }>({ skip: 0, take: 10 });
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        getQueuePendingMessages(namespace, queueName, paginationParams.skip, paginationParams.take)
            .then((data) => {
                setMessages(data);
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [paginationParams]);
    const onPageChange = (page: number) => {
        history.push(`${generateRoutePath('queuePendingMessages', { queueName, namespace })}?page=${page}`);
    };
    const onMessageDelete = (messageId: string, sequenceId: number) => {
        setLoading(true);
        deleteQueuePendingMessage(namespace, queueName, messageId, sequenceId)
            .catch((e) => {
                console.log(e);
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
        <QueuePendingMessagesPage
            skip={paginationParams.skip}
            take={paginationParams.take}
            messages={messages}
            loading={loading}
            queueName={queueName}
            namespace={namespace}
            onPageChange={onPageChange}
            onMessageDelete={onMessageDelete}
        />
    );
};

export default withRouter(QueuePendingMessages);
