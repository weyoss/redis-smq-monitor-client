import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import QueueMessages from '../common/QueueMessages';
import { IQueueRouteParams } from '../../routes/routes';
import { purgePendingMessages, deleteQueuePendingMessage, getQueuePendingMessages } from '../../transport/http/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueuePendingMessages: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getQueuePendingMessages(namespace, queueName, skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteQueuePendingMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const deleteMessagesRequestCallback = useCallback(() => purgePendingMessages(namespace, queueName), []);

    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Pending messages
            </h1>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={deleteMessagesRequestCallback}
            />
        </>
    );
};

export default withRouter(QueuePendingMessages);
