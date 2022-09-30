import React, { useState } from 'react';
import Paginator from '../Paginator';
import MessageOptions, { IMessageOptionsSharedProps } from './MessageOptions/MessageOptions';
import { Table } from 'react-bootstrap';
import { TQueryRequest } from '../../../hooks/useQuery';
import { IMessage } from '../../../transport/http/api/common/IMessage';
import ModalLink from '../ModalLink';

interface IProps extends IMessageOptionsSharedProps {
    messages: { total: number; items: { message: IMessage; sequenceId: number }[] };
    pageParams: {
        skip: number;
        take: number;
        page: number;
    };
    onSelectPageCallback: (page: number) => void;
    deleteMessagesRequestCallback: TQueryRequest<void>;
    deleteMessagesRequestSuccessCallback: () => void;
}

const MessagesPage: React.FC<IProps> = (props) => {
    const {
        messages,
        onSelectPageCallback,
        pageParams,
        deleteMessagesRequestCallback,
        deleteMessagesRequestSuccessCallback,
        ...rest
    } = props;
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
    if (!messages.total) {
        return <p>Empty message list</p>;
    }
    return (
        <>
            <div className={'mb-3 d-flex flex-row-reverse'}>
                <ModalLink
                    variant={'outline-danger'}
                    onSuccess={deleteMessagesRequestSuccessCallback}
                    request={deleteMessagesRequestCallback}
                    btnCaption={'Delete all'}
                    modalBody={<p>Are you sure you want to delete all messages?</p>}
                    modalTitle={'Deleting all messages'}
                />
            </div>
            <Table className={'table table-striped .messages'} hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Message</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.items.map(({ message, sequenceId }) => {
                        const mid = `${message.messageState.uuid}${sequenceId ? `-${sequenceId}` : ''}`;
                        return (
                            <tr key={mid}>
                                <td className={'text-break text-start w-25'}>{message.messageState.uuid}</td>
                                <td className={'text-break text-start'}>
                                    {activeMessageId === mid ? (
                                        <>
                                            <div>
                                                {<pre>{JSON.stringify(message, undefined, 2)}</pre>}
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-link shadow-none m-0 p-0"
                                                        onClick={() => setActiveMessageId(null)}
                                                    >
                                                        &uarr;
                                                    </button>
                                                </div>
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
                                    <MessageOptions
                                        {...rest}
                                        messageId={message.messageState.uuid}
                                        sequenceId={sequenceId}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Paginator
                totalItems={messages.total}
                onPageChange={onSelectPageCallback}
                currentPage={pageParams.page}
                itemsPerPage={pageParams.take}
            />
        </>
    );
};

export default MessagesPage;
