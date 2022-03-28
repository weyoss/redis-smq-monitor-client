import React from 'react';
import { Button, Modal as BaseModal } from 'react-bootstrap';

export interface IModalState {
    title: string;
    onSubmit: () => void;
    onCancel: () => void;
    cancelCaption?: string;
    submitCaption?: string;
    children: JSX.Element;
}

const Modal: React.FC<IModalState> = (props) => {
    const { title, onSubmit, onCancel, children, submitCaption, cancelCaption } = props;
    return (
        <BaseModal show={true} onHide={onCancel}>
            <BaseModal.Header closeButton>
                <BaseModal.Title>{title}</BaseModal.Title>
            </BaseModal.Header>
            <BaseModal.Body>{children}</BaseModal.Body>
            <BaseModal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    {cancelCaption ?? 'Cancel'}
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    {submitCaption ?? 'Submit'}
                </Button>
            </BaseModal.Footer>
        </BaseModal>
    );
};

export default Modal;
