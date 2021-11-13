import React from 'react';
import { Button, Modal as BaseModal } from 'react-bootstrap';
import { IModalState } from '../../../store/modal/state';

const Modal: React.FC<IModalState> = (props) => {
    const { title, body, onConfirmation, onCancel, show } = props;
    return (
        <>
            <BaseModal show={show} onHide={onCancel}>
                <BaseModal.Header closeButton>
                    <BaseModal.Title>{title}</BaseModal.Title>
                </BaseModal.Header>
                <BaseModal.Body>{body}</BaseModal.Body>
                <BaseModal.Footer>
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onConfirmation}>
                        OK
                    </Button>
                </BaseModal.Footer>
            </BaseModal>
        </>
    );
};

export default Modal;
