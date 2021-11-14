import React, { useState } from 'react';
import { IGetQueueMessagesResponse } from '../../../api/contract';
import { Dropdown, Spinner } from 'react-bootstrap';
import './style.css';
import Pager from '../Pager';
import { useDispatch } from 'react-redux';
import { hideModalAction, showModalAction } from '../../../store/modal/action';

interface IProps {
    messages: IGetQueueMessagesResponse;
    loading: boolean;
    pageParams: {
        skip: number;
        take: number;
        page: number;
    };
    onPageChange: (page: number) => void;
    onMessageDelete?: (messageId: string, sequenceId: number) => void;
    onMessageRequeue?: (messageId: string, sequenceId: number) => void;
}

const QueueMessageList: React.FC<IProps> = (props) => {
    const { loading, messages, onPageChange, pageParams, onMessageDelete, onMessageRequeue } = props;
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
    const dispatch = useDispatch();
    if (loading) {
        return <Spinner animation={'border'} />;
    }
    if (!messages.total) {
        return <p>Empty message list</p>;
    }
    const confirmMessageDeletion = (messageId: string, sequenceId: number) => {
        dispatch(
            showModalAction({
                show: true,
                title: 'Message deletion',
                body: 'Are you sure you want to delete this message?',
                onCancel: () => dispatch(hideModalAction()),
                onConfirmation: () => {
                    dispatch(hideModalAction());
                    onMessageDelete && onMessageDelete(messageId, sequenceId);
                }
            })
        );
    };
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
                                    {onMessageDelete || onMessageRequeue ? (
                                        <Dropdown>
                                            <Dropdown.Toggle variant={'link'}>...</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    {onMessageRequeue && (
                                                        <button
                                                            className={'btn btn-link shadow-none'}
                                                            onClick={() => onMessageRequeue(message.uuid, sequenceId)}
                                                        >
                                                            Requeue
                                                        </button>
                                                    )}
                                                    {onMessageDelete && (
                                                        <button
                                                            className={'btn btn-link shadow-none'}
                                                            onClick={() =>
                                                                confirmMessageDeletion(message.uuid, sequenceId)
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
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
                onPageChange={onPageChange}
                currentPage={pageParams.page}
                itemsPerPage={pageParams.take}
            />
        </>
    );
};

export default QueueMessageList;
