import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import QueueMessages from '../common/QueueMessages';
import { deleteQueueDeadLetteredMessage, getQueueDeadLetteredMessages, purgeDeadLetteredMessages } from '../../api/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueueDeadLetteredMessages: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;

    // callbacks
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getQueueDeadLetteredMessages(namespace, queueName, skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteQueueDeadLetteredMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const deleteMessagesRequestCallback = useCallback(() => purgeDeadLetteredMessages(namespace, queueName), []);

    return (
        <>
            <h2>
                {queueName}@{namespace} / Dead-lettered messages
            </h2>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={deleteMessagesRequestCallback}
            />
        </>
    );
};

export default withRouter(QueueDeadLetteredMessages);
