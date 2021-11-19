import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import QueueMessages from '../common/QueueMessages';
import { EMessagePriority } from '../../types/IMessage';
import { IQueueRouteParams } from '../../routes/routes';
import {
    requeueAcknowledgedMessage,
    requeueAcknowledgedMessageWithPriority,
    purgeAcknowledgedMessages,
    deleteQueueAcknowledgedMessage,
    getQueueAcknowledgedMessages
} from '../../transport/http/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueueAcknowledgedMessages: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getQueueAcknowledgedMessages(namespace, queueName, skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteQueueAcknowledgedMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const RequeueQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => requeueAcknowledgedMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const deleteMessagesRequestCallback = useCallback(() => purgeAcknowledgedMessages(namespace, queueName), []);
    const RequeueQueueMessageRequestWithPriorityFactory = useCallback(
        (messageId: string, sequenceId: number, priority: EMessagePriority) => {
            return () => requeueAcknowledgedMessageWithPriority(namespace, queueName, messageId, sequenceId, priority);
        },
        []
    );
    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Acknowledged messages
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

export default withRouter(QueueAcknowledgedMessages);
