import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import QueueMessages from '../common/QueueMessages';
import { deleteQueuePendingMessageWithPriority, getQueuePendingMessagesWithPriority } from '../../api/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueuePendingMessagesWithPriority: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;
    const fetchQueueMessagesFn = useCallback((skip: number, take: number) => {
        return getQueuePendingMessagesWithPriority(namespace, queueName, skip, take);
    }, []);
    const deleteQueueMessageFn = useCallback((messageId: string, sequenceId: number) => {
        return deleteQueuePendingMessageWithPriority(namespace, queueName, messageId, sequenceId);
    }, []);
    return (
        <>
            <h2>
                {queueName}@{namespace} / Pending messages with priority
            </h2>
            <QueueMessages fetchQueueMessagesFn={fetchQueueMessagesFn} deleteQueueMessageFn={deleteQueueMessageFn} />
        </>
    );
};

export default withRouter(QueuePendingMessagesWithPriority);
