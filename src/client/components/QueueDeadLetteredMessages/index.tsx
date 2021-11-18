import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import QueueMessages from '../common/QueueMessages';
import {
    deleteQueueDeadLetteredMessage,
    getQueueDeadLetteredMessages,
    purgeDeadLetteredMessages,
    requeueDeadLetteredMessage,
    requeueDeadLetteredMessageWithPriority
} from '../../transport/http/api';
import { EMessagePriority } from '../../types/IMessage';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueueDeadLetteredMessages: React.FC<IProps> = (props) => {
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
            <h2 className={'display-5'}>
                {queueName}@{namespace} / Dead-lettered messages
            </h2>
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
