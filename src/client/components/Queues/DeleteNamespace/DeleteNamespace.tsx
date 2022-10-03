import ModalLink from '../../common/ModalLink';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteNamespace } from '../../../transport/http/api';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';

interface IDeleteNamespaceProps {
    namespace: string;
}

const DeleteNamespace: React.FC<IDeleteNamespaceProps> = ({ namespace }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const deleteNamespaceRequestCallback = useCallback(() => deleteNamespace(namespace), [namespace]);
    const deleteNamespaceRequestSuccessCallback = useCallback(() => {
        dispatch(addNotificationAction(`Namespace (${namespace}) has been successfully deleted.`, ENotificationType.SUCCESS));
        history.push('/');
    }, [namespace]);
    return <ModalLink
        onSuccess={deleteNamespaceRequestSuccessCallback}
        request={deleteNamespaceRequestCallback}
        btnCaption={'Delete namespace'}
        variant={'outline-danger'}
        modalBody={
            <p>
                Are you sure you want to delete this namespace?
                <br />
                <br />
                The namespace will be deleted from the system alongside with its queues.
                <br />
                <br />
                Before confirming, make sure that this namespace is not used by a message handler.
            </p>
        }
        modalTitle={`Deleting namespace [${namespace}]`}
    />
}

export default DeleteNamespace;