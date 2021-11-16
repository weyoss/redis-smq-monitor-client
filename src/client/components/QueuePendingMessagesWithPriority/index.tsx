import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import QueueMessages from '../common/QueueMessages';
import {
    deleteQueuePendingMessageWithPriority,
    getQueuePendingMessagesWithPriority,
    purgePendingMessagesWithPriority
} from '../../api/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueuePendingMessagesWithPriority: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getQueuePendingMessagesWithPriority(namespace, queueName, skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteQueuePendingMessageWithPriority(namespace, queueName, messageId, sequenceId);
    }, []);
    const deleteMessagesRequestCallback = useCallback(() => purgePendingMessagesWithPriority(namespace, queueName), []);

    return (
        <>
            <h2>
                {queueName}@{namespace} / Pending messages with priority
            </h2>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={deleteMessagesRequestCallback}
            />
        </>
    );
};

export default withRouter(QueuePendingMessagesWithPriority);
