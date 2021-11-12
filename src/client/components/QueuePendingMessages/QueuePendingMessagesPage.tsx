import MessageList from '../common/MessageList';
import React from 'react';
import { IGetQueuePendingMessagesResponse } from '../../api/contract';

interface IProps {
    messages: IGetQueuePendingMessagesResponse;
    loading: boolean;
    namespace: string;
    queueName: string;
    onPageChange: (page: number) => void;
    skip: number;
    take: number;
    onMessageDelete?: (messageId: string, sequenceId: number) => void;
}

const QueuePendingMessagesPage: React.FC<IProps> = (props) => {
    const { queueName, namespace, ...rest } = props;
    return (
        <>
            <h2>
                {queueName}@{namespace} / Pending messages
            </h2>
            <MessageList {...rest} />
        </>
    );
};

export default QueuePendingMessagesPage;
