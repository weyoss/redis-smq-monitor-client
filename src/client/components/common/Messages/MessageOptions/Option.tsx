import { useDispatch } from 'react-redux';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../../hooks/useQuery';
import React, { useCallback, useEffect, useState } from 'react';
import { addNotificationAction } from '../../../../store/notifications/action';
import { ENotificationType } from '../../../../store/notifications/state';
import Modal from '../../Modal';

export interface IMessageOptionsProps {
    messageId: string;
    sequenceId?: number;
    messageOptionButtonCaption: string;
    RequestFactory(messageId: string, sequenceId?: number): TQueryRequest<void>;
    successCallback: () => void;
    successMessage: string;
    modalTitle: string;
    modalBody: string;
    modalButtonCancelCaption?: string;
    modalButtonSubmitCaption?: string;
}

const MessageOptions: React.FC<IMessageOptionsProps> = ({
    messageId,
    sequenceId,
    modalTitle,
    modalBody,
    messageOptionButtonCaption,
    RequestFactory,
    successCallback,
    successMessage,
    modalButtonCancelCaption,
    modalButtonSubmitCaption
}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const query = useQuery<void>();

    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(successMessage, ENotificationType.SUCCESS));
            successCallback();
        }
    }, [query.state]);

    const onSubmit = useCallback(() => {
        setShowModal(false);
        if (sequenceId !== undefined) query.sendQuery(RequestFactory(messageId, sequenceId));
        else query.sendQuery(RequestFactory(messageId));
    }, []);

    const onCancel = useCallback(() => setShowModal(false), []);

    return (
        <>
            <button className={'btn btn-link shadow-none dropdown-item'} onClick={() => setShowModal(true)}>
                {messageOptionButtonCaption}
            </button>
            {showModal && (
                <Modal
                    title={modalTitle}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    cancelCaption={modalButtonCancelCaption ?? `I'm not sure`}
                    submitCaption={modalButtonSubmitCaption ?? `Sure`}
                >
                    <p>{modalBody}</p>
                </Modal>
            )}
        </>
    );
};

export default MessageOptions;
