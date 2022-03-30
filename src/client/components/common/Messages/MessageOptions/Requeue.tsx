import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addNotificationAction } from '../../../../store/notifications/action';
import { ENotificationType } from '../../../../store/notifications/state';
import ModalLink from '../../ModalLink';
import { TQueryRequest } from '../../../../hooks/useQuery';

interface IProps {
    messageId: string;
    RequestFactory: TQueryRequest<void>;
    successCallback: () => void;
}

const Requeue: React.FC<IProps> = ({ messageId, RequestFactory, successCallback }) => {
    const dispatch = useDispatch();
    const onSuccess = useCallback(() => {
        dispatch(
            addNotificationAction(`Message ID ${messageId} has been successfully re-queued.`, ENotificationType.SUCCESS)
        );
        successCallback();
    }, [messageId]);
    return (
        <ModalLink
            className={'btn btn-link shadow-none dropdown-item'}
            onSuccess={onSuccess}
            request={RequestFactory}
            btnCaption={`Re-queue`}
            modalBody={<p>Are you sure you want to re-queue this message?</p>}
            modalTitle={`Message Re-queuing`}
        />
    );
};

export default Requeue;
