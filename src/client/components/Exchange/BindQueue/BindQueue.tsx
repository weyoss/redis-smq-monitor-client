import React, { useCallback, useEffect, useState } from 'react';
import FormModal from './FormModal';
import { Button } from 'react-bootstrap';
import { IMessageQueue } from '../../../transport/http/api/common/IMessage';
import useSelector from '../../../hooks/useSelector';
import { IStoreState } from '../../../store/state';
import { IWebsocketMainStreamState } from '../../../store/websocket-main-stream/state';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { useDispatch } from 'react-redux';
import { bindQueue } from '../../../transport/http/api/exchanges';
import { reloadAction } from '../../../store/components/Exchange/action';

export interface IBindQueueProps {
    exchangeName: string;
}

const BindQueue: React.FC<IBindQueueProps> = ({ exchangeName }) => {
    const dispatch = useDispatch();
    const [queues, setQueues] = useState<IMessageQueue[]>([]);
    const { payload } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );    const [openHandler, setOpenHandler] = useState<boolean>(false);
    const closeHandler = useCallback(() => setOpenHandler(false), []);
    useEffect(() => {
        if (payload.queuesCount) {
            const q: IMessageQueue[] = [];
            const { queues } = payload;
            for(const ns in queues) {
                for (const name in queues[ns]) {
                    q.push({ name, ns });
                }
            }
            setQueues(q);
        }
    }, [payload.queuesCount]);
    const bindQueuesFn = useCallback(() => {
        if (queues.length) setOpenHandler(true);
        else {
            dispatch(addNotificationAction(`At least one queue is required. Please create a queue first.`, ENotificationType.ERROR));
        }
    }, [queues, openHandler]);

    const RequestFactory = useCallback((queue: string) => {
        const [ns, name] = queue.split('@');
        return () => bindQueue({ ns, name }, exchangeName);
    }, [exchangeName]);

    const requestSuccessCallback = useCallback(() => {
        dispatch(addNotificationAction(`Queue has been successfully bound.`, ENotificationType.SUCCESS));
        dispatch(reloadAction());
    }, []);

    return (
        <>
            <Button variant={'outline-primary'} onClick={bindQueuesFn} className={'me-3'}>
                Bind Queue
            </Button>
            {openHandler && (
                <FormModal closeHandlerCallback={closeHandler} queues={queues} exchangeName={exchangeName} RequestFactory={RequestFactory} requestSuccessCallback={requestSuccessCallback} />
            )}
        </>
    );
};

export default BindQueue;
