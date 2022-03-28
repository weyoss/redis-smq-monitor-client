import React, { useCallback, useState } from 'react';
import FormModal from './FormModal';
import { TQueryRequest } from '../../../../hooks/useQuery';
import { Button } from 'react-bootstrap';

export interface ISetQueueRateLimitProps {
    RequestFactory: (limit: number, interval: number) => TQueryRequest<void>;
    requestSuccessCallback: () => void;
}

const SetRateLimit: React.FC<ISetQueueRateLimitProps> = (props) => {
    const [openHandler, setOpenHandler] = useState<boolean>(false);
    const closeHandler = useCallback(() => setOpenHandler(false), []);
    return (
        <>
            <Button variant={'outline-primary'} onClick={() => setOpenHandler(true)} className={'me-3'}>
                Set queue rate limit
            </Button>
            {openHandler && (
                <FormModal {...props} closeHandlerCallback={closeHandler} onSubmitCallback={closeHandler} />
            )}
        </>
    );
};

export default SetRateLimit;
