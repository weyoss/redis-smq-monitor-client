import React, { useCallback, useState } from 'react';
import FormModal from './FormModal';
import { Button } from 'react-bootstrap';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { useDispatch } from 'react-redux';
import { createQueue } from '../../../transport/http/api/create-queue';

const CreateQueue: React.FC = () => {
    const dispatch = useDispatch();
    const [openHandler, setOpenHandler] = useState<boolean>(false);
    const closeHandler = useCallback(() => setOpenHandler(false), []);
    const RequestFactory = useCallback(
        (queue, enablePriorityQueuing) => () => createQueue(queue, enablePriorityQueuing),
        []
    );
    const requestSuccessCallback = useCallback(() => {
        dispatch(addNotificationAction(`Queue has been successfully created.`, ENotificationType.SUCCESS));
    }, []);
    return (
        <>
            <Button variant={'outline-primary'} onClick={() => setOpenHandler(true)} className={'me-3'}>
                Create Queue
            </Button>
            {openHandler && (
                <FormModal closeHandlerCallback={closeHandler} onSubmitCallback={closeHandler} RequestFactory={RequestFactory} requestSuccessCallback={requestSuccessCallback} />
            )}
        </>
    );
};

export default CreateQueue;
