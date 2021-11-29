import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import QueueMessages from '../common/QueueMessages';
import { EMessagePriority } from '../../types/IMessage';
import {
    requeueDeadLetteredMessage,
    requeueDeadLetteredMessageWithPriority,
    purgeDeadLetteredMessages,
    deleteQueueDeadLetteredMessage,
    getQueueDeadLetteredMessages
} from '../../transport/http/api';
import { IQueueRouteParams } from '../../routes/routes/queue';

const QueueDeadLetteredMessages: React.FC<RouteComponentProps<IQueueRouteParams>> = (props) => {
    const { namespace, queueName } = props.match.params;
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getQueueDeadLetteredMessages(namespace, queueName, skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteQueueDeadLetteredMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const RequeueQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => requeueDeadLetteredMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const RequeueQueueMessageRequestWithPriorityFactory = useCallback(
        (messageId: string, sequenceId: number, priority: EMessagePriority) => {
            return () => requeueDeadLetteredMessageWithPriority(namespace, queueName, messageId, sequenceId, priority);
        },
        []
    );
    const deleteMessagesRequestCallback = useCallback(() => purgeDeadLetteredMessages(namespace, queueName), []);

    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Dead-lettered messages
            </h1>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                RequeueMessageRequestFactory={RequeueQueueMessageRequestFactory}
                deleteMessagesRequestCallback={deleteMessagesRequestCallback}
                RequeueMessageWithPriorityRequestFactory={RequeueQueueMessageRequestWithPriorityFactory}
            />
        </>
    );
};

export default withRouter(QueueDeadLetteredMessages);
