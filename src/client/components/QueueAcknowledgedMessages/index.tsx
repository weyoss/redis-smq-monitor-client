import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import QueueMessages from '../common/QueueMessages';
import { deleteQueueAcknowledgedMessage, getQueueAcknowledgedMessages, purgeAcknowledgedMessages } from '../../api/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueueAcknowledgedMessages: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;

    // callbacks
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getQueueAcknowledgedMessages(namespace, queueName, skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteQueueAcknowledgedMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    const deleteMessagesRequestCallback = useCallback(() => purgeAcknowledgedMessages(namespace, queueName), []);

    return (
        <>
            <h2>
                {queueName}@{namespace} / Acknowledged messages
            </h2>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={deleteMessagesRequestCallback}
            />
        </>
    );
};

export default withRouter(QueueAcknowledgedMessages);
