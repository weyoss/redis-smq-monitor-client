import React, { useCallback, useState } from 'react';
import FormModal from './FormModal';
import { TQueryRequest } from '../../../hooks/useQuery';
import { Button } from 'react-bootstrap';

export interface ICreateExchangeProps {
    RequestFactory: (exchangeName: string) => TQueryRequest<void>;
    requestSuccessCallback: () => void;
}

const CreateExchange: React.FC<ICreateExchangeProps> = (props) => {
    const [openHandler, setOpenHandler] = useState<boolean>(false);
    const closeHandler = useCallback(() => setOpenHandler(false), []);
    return (
        <>
            <Button variant={'outline-primary'} onClick={() => setOpenHandler(true)} className={'me-3'}>
                Create Exchange
            </Button>
            {openHandler && (
                <FormModal {...props} closeHandlerCallback={closeHandler} onSubmitCallback={closeHandler} />
            )}
        </>
    );
};

export default CreateExchange;
