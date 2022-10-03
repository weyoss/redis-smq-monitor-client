import React, { useCallback, useState } from 'react';
import FormModal from './FormModal';
import { Button } from 'react-bootstrap';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { useDispatch } from 'react-redux';
import { createExchange } from '../../../transport/http/api/exchanges';
import { reloadAction } from '../../../store/components/LeftPanel/Exchanges/action';

const CreateExchange: React.FC = () => {
    const dispatch = useDispatch();
    const [openHandler, setOpenHandler] = useState<boolean>(false);
    const closeHandler = useCallback(() => setOpenHandler(false), []);
    const RequestFactory = useCallback(
        (exchangeName) => () => createExchange(exchangeName),
        []
    );
    const requestSuccessCallback = useCallback(() => {
        dispatch(addNotificationAction(`Exchange has been successfully created.`, ENotificationType.SUCCESS));
        dispatch(reloadAction());
    }, []);
    return (
        <>
            <Button variant={'outline-primary'} onClick={() => setOpenHandler(true)} className={'me-3'}>
                Create Exchange
            </Button>
            {openHandler && (
                <FormModal closeHandlerCallback={closeHandler} onSubmitCallback={closeHandler} RequestFactory={RequestFactory} requestSuccessCallback={requestSuccessCallback} />
            )}
        </>
    );
};

export default CreateExchange;
