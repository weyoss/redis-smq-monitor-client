import { Dropdown } from 'react-bootstrap';
import DeleteMessage from './DeleteMessage';
import React from 'react';
import { TQueryRequest } from '../../../../hooks/useQuery';
import RequeueMessage from './RequeueMessage';

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
    return (
        <Dropdown>
            <Dropdown.Toggle variant={'link'}>...</Dropdown.Toggle>
            <Dropdown.Menu>
                {RequeueMessageRequestFactory && requeueMessageSuccessCallback && (
                    <Dropdown.Item>
                        <RequeueMessage
                            messageId={messageId}
                            sequenceId={sequenceId}
                            requeueMessageSuccessCallback={requeueMessageSuccessCallback}
                            RequeueMessageRequestFactory={RequeueMessageRequestFactory}
                        />
                    </Dropdown.Item>
                )}
                <Dropdown.Item>
                    <DeleteMessage
                        messageId={messageId}
                        sequenceId={sequenceId}
                        deleteMessageSuccessCallback={deleteMessageSuccessCallback}
                        DeleteMessageRequestFactory={DeleteMessageRequestFactory}
                    />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MessageOptions;
