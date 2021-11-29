import { RouteComponentProps, withRouter } from 'react-router';
import React, { useCallback } from 'react';
import QueueMessages from '../common/QueueMessages';
import {
    purgePendingMessagesWithPriority,
    getQueuePendingMessagesWithPriority,
    deleteQueuePendingMessageWithPriority
} from '../../transport/http/api';
import { IQueueRouteParams } from '../../routes/routes/queue';

const QueuePendingMessagesWithPriority: React.FC<RouteComponentProps<IQueueRouteParams>> = (props) => {
    const { namespace, queueName } = props.match.params;
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () =>
            getQueuePendingMessagesWithPriority(namespace, queueName, skip, take).then((result) => {
                return {
                    ...result,
                    data: {
                        ...result.data,
                        data: {
                            ...result.data.data,
                            items: result.data.data.items.map((i) => ({
                                message: i
                            }))
                        }
                    }
                };
            });
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string) => {
        return () => deleteQueuePendingMessageWithPriority(namespace, queueName, messageId);
    }, []);
    const deleteMessagesRequestCallback = useCallback(() => purgePendingMessagesWithPriority(namespace, queueName), []);

    return (
        <>
            <h1 className={'display-4'}>
                {queueName}@{namespace} / Pending messages with priority
            </h1>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={deleteMessagesRequestCallback}
            />
        </>
    );
};

export default withRouter(QueuePendingMessagesWithPriority);
