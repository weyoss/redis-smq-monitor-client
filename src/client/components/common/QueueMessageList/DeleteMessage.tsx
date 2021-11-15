import { useDispatch } from 'react-redux';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../hooks/useQuery';
import React, { useCallback, useEffect } from 'react';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { hideModalAction, showModalAction } from '../../../store/modal/action';

interface IProps {
    messageId: string;
    sequenceId: number;
    onDeleteMessageSuccess: () => void;
    DeleteMessageRequestFactory: (messageId: string, sequenceId: number) => TQueryRequest<void>;
}

const DeleteMessage: React.FC<IProps> = ({
    messageId,
    sequenceId,
    DeleteMessageRequestFactory,
    onDeleteMessageSuccess
}) => {
    const dispatch = useDispatch();
    const deleteMessageQuery = useQuery<void>();
    const onMessageDelete = useCallback((messageId: string, sequenceId: number) => {
        deleteMessageQuery.sendQuery(DeleteMessageRequestFactory(messageId, sequenceId));
    }, []);
    useEffect(() => {
        if (deleteMessageQuery.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(`The message has been successfully deleted.`, ENotificationType.SUCCESS));
            onDeleteMessageSuccess();
        }
    }, [deleteMessageQuery.state]);

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
        <button className={'btn btn-link shadow-none'} onClick={() => confirmMessageDeletion(messageId, sequenceId)}>
            Delete
        </button>
    );
};

export default DeleteMessage;
