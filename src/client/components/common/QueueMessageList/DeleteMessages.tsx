import { Button } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../hooks/useQuery';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import Modal from '../Modal/Modal';

interface IProps {
    onSuccess: () => void;
    request: TQueryRequest<void>;
}

const DeleteMessages: React.FC<IProps> = ({ request, onSuccess }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const query = useQuery();

    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(`All messages has been successfully deleted.`, ENotificationType.SUCCESS));
            onSuccess();
        }
    }, [query.state.status]);

    const onSubmit = useCallback(() => {
        setShowModal(false);
        query.sendQuery(request);
    }, []);

    const onCancel = useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <>
            <Button variant={'link'} onClick={() => setShowModal(true)}>
                Delete all
            </Button>
            {showModal && (
                <Modal
                    title={'Message Deletion'}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    cancelCaption={`I'm not sure.`}
                    submitCaption={`Sure, I am!`}
                >
                    <p>Are you sure you want to delete all the messages?</p>
                </Modal>
            )}
        </>
    );
};

export default DeleteMessages;
