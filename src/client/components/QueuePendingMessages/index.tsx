import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import QueueMessages from '../common/QueueMessages';
import { deleteQueuePendingMessage, getQueuePendingMessages, purgePendingMessages } from '../../api/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueuePendingMessages: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;

    // callbacks
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getQueuePendingMessages(namespace, queueName, skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteQueuePendingMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const deleteMessagesRequestCallback = useCallback(() => purgePendingMessages(namespace, queueName), []);

    return (
        <>
            <h2>
                {queueName}@{namespace} / Pending messages
            </h2>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={deleteMessagesRequestCallback}
            />
        </>
    );
};

export default withRouter(QueuePendingMessages);
