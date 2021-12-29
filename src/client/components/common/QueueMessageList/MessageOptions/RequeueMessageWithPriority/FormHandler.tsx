import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useQuery, { EQueryStatus } from '../../../../../hooks/useQuery';
import { addNotificationAction } from '../../../../../store/notifications/action';
import { ENotificationType } from '../../../../../store/notifications/state';
import Modal from '../../../Modal/Modal';
import FormBody from './FormBody';
import { IRequeueMessageWithPriorityProps } from './index';
import { EMessagePriority } from '../../../../../transport/http/api/common/IMessage';

interface IHandlerProps extends IRequeueMessageWithPriorityProps {
    closeHandlerCallback: () => void;
    onSubmitCallback: () => void;
}

const FormHandler: React.FC<IHandlerProps> = ({
    messageId,
    sequenceId,
    RequeueMessageRequestFactory,
    requeueMessageSuccessCallback,
    closeHandlerCallback
}) => {
    const [priority, setPriority] = useState<EMessagePriority>(EMessagePriority.NORMAL);
    const dispatch = useDispatch();
    const query = useQuery<void>();
    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS || query.state.status === EQueryStatus.ERROR) {
            if (query.state.status === EQueryStatus.SUCCESS) {
                dispatch(
                    addNotificationAction(
                        `Message ID ${messageId} successfully re-queued with priority.`,
                        ENotificationType.SUCCESS
                    )
                );
                requeueMessageSuccessCallback();
            }
            closeHandlerCallback();
        }
    }, [query.state]);

    const onSelectPriority = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setPriority(Number(event.target.value));
    }, []);

    const onSubmit = useCallback(() => {
        query.sendQuery(RequeueMessageRequestFactory(messageId, sequenceId, priority));
    }, []);

    return (
        <Modal
            title={'Re-queue message with priority'}
            onSubmit={onSubmit}
            onCancel={closeHandlerCallback}
            submitCaption={'Re-queue'}
        >
            <FormBody
                messageId={messageId}
                messagePriority={priority}
                onSelectPriority={onSelectPriority}
                queryState={query.state}
            />
        </Modal>
    );
};

export default FormHandler;
