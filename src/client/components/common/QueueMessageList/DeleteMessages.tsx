import { Button } from 'react-bootstrap';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../hooks/useQuery';
import { hideModalAction, showModalAction } from '../../../store/modal/action';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';

interface IProps {
    onSuccess: () => void;
    request: TQueryRequest<void>;
}

const DeleteMessages: React.FC<IProps> = ({ request, onSuccess }) => {
    const dispatch = useDispatch();
    const purgeMessagesQuery = useQuery();
    const confirmPurgeMessages = useCallback(() => {
        dispatch(
            showModalAction({
                show: true,
                title: 'Message Deletion',
                body: 'Are you sure you want to delete all the messages?',
                onCancel: () => dispatch(hideModalAction()),
                onConfirmation: () => {
                    dispatch(hideModalAction());
                    purgeMessagesQuery.sendQuery(request);
                }
            })
        );
    }, []);
    useEffect(() => {
        if (purgeMessagesQuery.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(`All messages has been successfully deleted.`, ENotificationType.SUCCESS));
            onSuccess();
        }
    }, [purgeMessagesQuery.state.status]);
    return (
        <Button variant={'link'} onClick={() => confirmPurgeMessages()}>
            Delete all
        </Button>
    );
};

export default DeleteMessages;
