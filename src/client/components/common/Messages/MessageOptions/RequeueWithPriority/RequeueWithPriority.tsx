import { TQueryRequest } from '../../../../../hooks/useQuery';
import React, { useCallback, useState } from 'react';
import FormHandler from './FormHandler';
import { EMessagePriority } from '../../../../../transport/http/api/common/IMessage';

export interface IRequeueMessageWithPriorityProps {
    messageId: string;
    sequenceId: number;
    RequeueMessageRequestFactory: (
        messageId: string,
        sequenceId: number,
        priority: EMessagePriority
    ) => TQueryRequest<void>;
    requeueMessageSuccessCallback: () => void;
}

const RequeueWithPriority: React.FC<IRequeueMessageWithPriorityProps> = (props) => {
    const [openHandler, setOpenHandler] = useState<boolean>(false);
    const closeHandler = useCallback(() => setOpenHandler(false), []);
    return (
        <>
            <button
                key={`${props.messageId}-requeue-w-priority`}
                className={'btn btn-link shadow-none dropdown-item'}
                onClick={() => setOpenHandler(true)}
            >
                Re-queue message with priority
            </button>
            {openHandler && (
                <FormHandler {...props} closeHandlerCallback={closeHandler} onSubmitCallback={closeHandler} />
            )}
        </>
    );
};

export default RequeueWithPriority;
