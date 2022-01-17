import { Button } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import useQuery, { EQueryStatus, TQueryRequest } from '../../../hooks/useQuery';
import Modal from '../Modal/Modal';

interface IProps {
    onSuccess: () => void;
    request: TQueryRequest<void>;
    btnCaption: string;
    modalBody: JSX.Element;
    modalTitle: string;
}

const SButton: React.FC<IProps> = ({ btnCaption, modalTitle, modalBody, request, onSuccess }) => {
    const [showModal, setShowModal] = useState(false);
    const query = useQuery();

    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
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
                {btnCaption}
            </Button>
            {showModal && (
                <Modal
                    title={modalTitle}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    cancelCaption={`Cancel`}
                    submitCaption={`Confirm`}
                >
                    {modalBody}
                </Modal>
            )}
        </>
    );
};

export default SButton;
