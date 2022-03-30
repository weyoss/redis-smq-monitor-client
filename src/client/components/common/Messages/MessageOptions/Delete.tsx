import { TQueryRequest } from '../../../../hooks/useQuery';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addNotificationAction } from '../../../../store/notifications/action';
import { ENotificationType } from '../../../../store/notifications/state';
import ModalLink from '../../ModalLink';

interface IProps {
    messageId: string;
    successCallback: () => void;
    RequestFactory: TQueryRequest<void>;
}

const Delete: React.FC<IProps> = ({ messageId, RequestFactory, successCallback }) => {
    const dispatch = useDispatch();
    const onSuccess = useCallback(() => {
        dispatch(
            addNotificationAction(`Message ID ${messageId} has been successfully deleted.`, ENotificationType.SUCCESS)
        );
        successCallback();
    }, [messageId]);
    return (
        <ModalLink
            className={'btn btn-link shadow-none dropdown-item'}
            onSuccess={onSuccess}
            request={RequestFactory}
            btnCaption={`Delete`}
            modalBody={<p>Are you sure you want to delete this message?</p>}
            modalTitle={`Message Deletion`}
        />
    );
};

export default Delete;
