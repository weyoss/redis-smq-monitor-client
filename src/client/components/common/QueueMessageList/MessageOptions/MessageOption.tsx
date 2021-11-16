import { useDispatch } from 'react-redux';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../../hooks/useQuery';
import React, { useCallback, useEffect } from 'react';
import { hideModalAction, showModalAction } from '../../../../store/modal/action';
import { addNotificationAction } from '../../../../store/notifications/action';
import { ENotificationType } from '../../../../store/notifications/state';

interface IProps {
    messageId: string;
    sequenceId: number;
    confirmationModalTitle: string;
    confirmationModalBody: string;
    messageOptionCaption: string;
    RequestFactory: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    successCallback: () => void;
    successMessage: string;
}

const MessageOptions: React.FC<IProps> = ({
    messageId,
    sequenceId,
    confirmationModalTitle,
    confirmationModalBody,
    messageOptionCaption,
    RequestFactory,
    successCallback,
    successMessage
}) => {
    const dispatch = useDispatch();
    const query = useQuery<void>();
    const sendQuery = useCallback((messageId: string, sequenceId: number) => {
        query.sendQuery(RequestFactory(messageId, sequenceId));
    }, []);
    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(successMessage, ENotificationType.SUCCESS));
            successCallback();
        }
    }, [query.state]);

    const confirm = (messageId: string, sequenceId: number) => {
        dispatch(
            showModalAction({
                show: true,
                title: confirmationModalTitle,
                body: confirmationModalBody,
                onCancel: () => dispatch(hideModalAction()),
                onConfirmation: () => {
                    dispatch(hideModalAction());
                    sendQuery(messageId, sequenceId);
                }
            })
        );
    };

    return (
        <button className={'btn btn-link shadow-none'} onClick={() => confirm(messageId, sequenceId)}>
            {messageOptionCaption}
        </button>
    );
};

export default MessageOptions;
