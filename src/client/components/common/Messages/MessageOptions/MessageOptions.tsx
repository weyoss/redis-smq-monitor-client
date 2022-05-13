import { DropdownButton } from 'react-bootstrap';
import Delete from './Delete';
import React from 'react';
import { TQueryRequest } from '../../../../hooks/useQuery';
import Requeue from './Requeue';

export interface IMessageOptionsSharedProps {
    DeleteMessageRequestFactory: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    deleteMessageSuccessCallback: () => void;
    RequeueMessageRequestFactory?: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    requeueMessageSuccessCallback?: () => void;
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
