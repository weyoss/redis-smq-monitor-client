import React, { useState } from 'react';
import { IGetQueueMessagesResponse } from '../../../api/contract';
import { Dropdown } from 'react-bootstrap';
import Pager from '../Pager';
import DeleteMessage from './DeleteMessage';
import { TQueryRequest } from '../../../hooks/useQuery';

interface IProps {
    messages: IGetQueueMessagesResponse['data'];
    pageParams: {
        skip: number;
        take: number;
        page: number;
    };
    onSelectPageCallback: (page: number) => void;
    DeleteMessageRequestFactory: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    onDeleteMessageSuccessCallback: () => void;
    RequeueMessageRequestFactory?: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    onRequeueMessageSuccessCallback?: () => void;
}

const QueueMessageList: React.FC<IProps> = (props) => {
    const {
        messages,
        onSelectPageCallback,
        pageParams,
        DeleteMessageRequestFactory,
        onDeleteMessageSuccessCallback,
        RequeueMessageRequestFactory,
        onRequeueMessageSuccessCallback
    } = props;
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
    if (!messages.total) {
        return <p>Empty message list</p>;
    }
    return (
        <>
            <table className={'table .messages'}>
                <thead className={'table-light'}>
                    <tr>
                        <th>ID</th>
                        <th>Payload (body)</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.items.map(({ message, sequenceId }) => {
                        const mid = `${message.uuid}-${sequenceId}`;
                        return (
                            <tr key={mid}>
                                <td className={'text-break text-start w-25'}>{message.uuid}</td>
                                <td className={'text-break text-start'}>
                                    {activeMessageId === mid ? (
                                        <>
                                            <div>
                                                {JSON.stringify(message)}{' '}
                                                <button
                                                    type="button"
                                                    className="btn btn-link shadow-none"
                                                    onClick={() => setActiveMessageId(null)}
                                                >
                                                    &uarr;
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                {JSON.stringify(message.body)}{' '}
                                                <button
                                                    className={'btn btn-link shadow-none'}
                                                    onClick={() => setActiveMessageId(mid)}
                                                >
                                                    &darr;
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </td>
                                <td>
                                    {DeleteMessageRequestFactory || RequeueMessageRequestFactory ? (
                                        <Dropdown>
                                            <Dropdown.Toggle variant={'link'}>...</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    {RequeueMessageRequestFactory && onRequeueMessageSuccessCallback && (
                                                        <button
                                                            className={'btn btn-link shadow-none'}
                                                            onClick={() =>
                                                                RequeueMessageRequestFactory(message.uuid, sequenceId)
                                                            }
                                                        >
                                                            Requeue
                                                        </button>
                                                    )}
                                                    <DeleteMessage
                                                        messageId={message.uuid}
                                                        sequenceId={sequenceId}
                                                        onDeleteMessageSuccess={onDeleteMessageSuccessCallback}
                                                        DeleteMessageRequestFactory={DeleteMessageRequestFactory}
                                                    />
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pager
                totalItems={messages.total}
                onPageChange={onSelectPageCallback}
                currentPage={pageParams.page}
                itemsPerPage={pageParams.take}
            />
        </>
    );
};

export default QueueMessageList;
