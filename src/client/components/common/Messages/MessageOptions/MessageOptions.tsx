import { DropdownButton } from 'react-bootstrap';
import Delete from './Delete';
import React from 'react';
import { TQueryRequest } from '../../../../hooks/useQuery';
import Requeue from './Requeue';
import RequeueWithPriority from './RequeueWithPriority/RequeueWithPriority';
import { EMessagePriority } from '../../../../transport/http/api/common/IMessage';

export interface IMessageOptionsSharedProps {
    DeleteMessageRequestFactory: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    deleteMessageSuccessCallback: () => void;
    RequeueMessageRequestFactory?: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    requeueMessageSuccessCallback?: () => void;
    RequeueMessageWithPriorityRequestFactory?: (
        messageId: string,
        sequenceId: number,
        priority: EMessagePriority
    ) => TQueryRequest<void>;
    requeueMessageWithPrioritySuccessCallback?: () => void;
}

interface IMessageOptionsProps extends IMessageOptionsSharedProps {
    messageId: string;
    sequenceId: number;
}

const MessageOptions: React.FC<IMessageOptionsProps> = ({
    DeleteMessageRequestFactory,
    deleteMessageSuccessCallback,
    RequeueMessageRequestFactory,
    requeueMessageSuccessCallback,
    RequeueMessageWithPriorityRequestFactory,
    requeueMessageWithPrioritySuccessCallback,
    messageId,
    sequenceId
}) => {
    const options: JSX.Element[] = [];
    if (RequeueMessageRequestFactory && requeueMessageSuccessCallback) {
        options.push(
            <Requeue
                key={`${messageId}-requeue`}
                messageId={messageId}
                successCallback={requeueMessageSuccessCallback}
                RequestFactory={RequeueMessageRequestFactory(messageId, sequenceId)}
            />
        );
    }
    if (RequeueMessageWithPriorityRequestFactory && requeueMessageWithPrioritySuccessCallback) {
        options.push(
            <RequeueWithPriority
                key={`${messageId}-requeue-w-priority`}
                messageId={messageId}
                sequenceId={sequenceId}
                RequeueMessageRequestFactory={RequeueMessageWithPriorityRequestFactory}
                requeueMessageSuccessCallback={requeueMessageWithPrioritySuccessCallback}
            />
        );
    }
    options.push(
        <Delete
            key={`${messageId}-delete`}
            messageId={messageId}
            successCallback={deleteMessageSuccessCallback}
            RequestFactory={DeleteMessageRequestFactory(messageId, sequenceId)}
        />
    );
    return (
        <DropdownButton variant={'link'} id={`options-message-${messageId}`} title="...">
            {options}
        </DropdownButton>
    );
};

export default MessageOptions;
