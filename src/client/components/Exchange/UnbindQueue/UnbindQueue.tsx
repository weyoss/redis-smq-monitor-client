import React, { useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IMessageQueue } from '../../../transport/http/api/common/IMessage';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { useDispatch } from 'react-redux';
import { unbindQueue } from '../../../transport/http/api/exchanges';
import { reloadAction } from '../../../store/components/Exchange/action';
import useQuery, { EQueryStatus } from '../../../hooks/useQuery';

export interface IBindQueueProps {
    exchangeName: string;
    queue: IMessageQueue;
}

const UnbindQueue: React.FC<IBindQueueProps> = ({ exchangeName, queue }) => {
    const dispatch = useDispatch();
    const query = useQuery();
    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(`Queue has been successfully unbound.`, ENotificationType.SUCCESS));
            dispatch(reloadAction());        }
    }, [query.state.status]);
    const unbindQueueRequest = useCallback(() => {
        query.sendQuery(() => unbindQueue(queue, exchangeName));
    }, [exchangeName, queue]);
    return (
        <>
            <Button variant={'link'} onClick={unbindQueueRequest} className={'me-3'} size={'sm'}>
                Unbind Queue
            </Button>
        </>
    );
};

export default UnbindQueue;
