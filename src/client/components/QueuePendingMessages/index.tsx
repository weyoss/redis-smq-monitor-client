import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import { IQueueRouteParams } from '../../routes/contract';
import QueueMessages from '../common/QueueMessages';
import { deleteQueuePendingMessage, getQueuePendingMessages } from '../../api/api';

interface IProps extends RouteComponentProps<IQueueRouteParams> {}

const QueuePendingMessages: React.FC<IProps> = (props) => {
    const { namespace, queueName } = props.match.params;
    const fetchQueueMessagesFn = useCallback((skip: number, take: number) => {
        return getQueuePendingMessages(namespace, queueName, skip, take);
    }, []);
    const deleteQueueMessageFn = useCallback((messageId: string, sequenceId: number) => {
        return deleteQueuePendingMessage(namespace, queueName, messageId, sequenceId);
    }, []);
    return (
        <>
            <h2>
                {queueName}@{namespace} / Pending messages
            </h2>
            <QueueMessages fetchQueueMessagesFn={fetchQueueMessagesFn} deleteQueueMessageFn={deleteQueueMessageFn} />
        </>
    );
};

export default withRouter(QueuePendingMessages);
