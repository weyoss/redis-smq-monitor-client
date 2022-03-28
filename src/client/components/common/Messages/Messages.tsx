import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import queryString from 'query-string';
import MessagesPage from './MessagesPage';
import { TQueryRequest } from '../../../hooks/useQuery';
import Query from '../Query';
import { TPaginatedHTTPResponse } from '../../../transport/http/api';
import { IQueueRouteParams } from '../../../routes/routes/queue';
import { EMessagePriority, IMessage } from 'client/transport/http/api/common/IMessage';

interface IProps extends RouteComponentProps<IQueueRouteParams> {
    FetchQueueMessagesRequestFactory: (
        skip: number,
        take: number
    ) => TQueryRequest<TPaginatedHTTPResponse<{ message: IMessage; sequenceId?: number }>>;
    DeleteQueueMessageRequestFactory(messageId: string, sequenceId?: number): TQueryRequest<void>;
    RequeueMessageRequestFactory?: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    deleteMessagesRequestCallback: TQueryRequest<void>;
    RequeueMessageWithPriorityRequestFactory?: (
        messageId: string,
        sequenceId: number,
        priority: EMessagePriority
    ) => TQueryRequest<void>;
}

const getPaginationParams = (path: string, take = 10) => {
    const { page } = queryString.parse(path);
    const pageNumber = typeof page === 'string' && Number(page) > 1 ? Number(page) : 1;
    const skip = (pageNumber - 1) * take;
    return {
        skip,
        take,
        page: pageNumber
    };
};

const QueueMessages: React.FC<IProps> = ({
    location,
    deleteMessagesRequestCallback,
    FetchQueueMessagesRequestFactory,
    DeleteQueueMessageRequestFactory,
    RequeueMessageRequestFactory,
    RequeueMessageWithPriorityRequestFactory
}) => {
    const [paginationParams, setPaginationParams] = useState<{ skip: number; take: number; page: number }>(
        getPaginationParams(location.search)
    );

    // Request fn
    const request = useMemo(() => FetchQueueMessagesRequestFactory(paginationParams.skip, paginationParams.take), [
        paginationParams
    ]);

    // Handling location update
    useEffect(() => {
        const params = getPaginationParams(location.search);
        if (params.page !== paginationParams.page) setPaginationParams(params);
    }, [location.search]);

    // Pagination navigation
    const history = useHistory();
    const onSelectPageCallback = useCallback((page: number) => {
        const params = queryString.parse(location.search);
        params.page = String(page);
        history.push({
            search: queryString.stringify(params)
        });
    }, []);

    const onMessageOperationSuccessCallback = useCallback(() => {
        // force fetching messages with new sequence IDs
        setPaginationParams(() => ({
            ...paginationParams
        }));
    }, []);

    return (
        <Query request={request}>
            {({ state }) => {
                return (
                    <MessagesPage
                        messages={state.data.data}
                        pageParams={paginationParams}
                        onSelectPageCallback={onSelectPageCallback}
                        DeleteMessageRequestFactory={DeleteQueueMessageRequestFactory}
                        deleteMessageSuccessCallback={onMessageOperationSuccessCallback}
                        RequeueMessageRequestFactory={RequeueMessageRequestFactory}
                        requeueMessageSuccessCallback={onMessageOperationSuccessCallback}
                        deleteMessagesRequestCallback={deleteMessagesRequestCallback}
                        deleteMessagesRequestSuccessCallback={onMessageOperationSuccessCallback}
                        RequeueMessageWithPriorityRequestFactory={RequeueMessageWithPriorityRequestFactory}
                        requeueMessageWithPrioritySuccessCallback={onMessageOperationSuccessCallback}
                    />
                );
            }}
        </Query>
    );
};

export default withRouter(QueueMessages);
