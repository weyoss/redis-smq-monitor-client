import { withRouter } from 'react-router';
import React, { useCallback } from 'react';
import QueueMessages from '../common/QueueMessages';
import { getScheduledMessages, purgeScheduledMessages, deleteScheduledMessage } from '../../transport/http/api';

const ScheduledMessages: React.FC = (props) => {
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () => getScheduledMessages(skip, take);
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string, sequenceId: number) => {
        return () => deleteScheduledMessage(messageId, sequenceId);
    }, []);

    return (
        <>
            <h2 className={'display-5'}>Scheduled Messages</h2>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={purgeScheduledMessages}
            />
        </>
    );
};

export default withRouter(ScheduledMessages);
