import React, { useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { useDispatch } from 'react-redux';
import useQuery, { EQueryStatus } from '../../../hooks/useQuery';
import { useHistory } from 'react-router';
import { IMessageQueue } from '../../../transport/http/api/common/IMessage';
import { deleteQueue } from '../../../transport/http/api/delete-queue';
import { queues } from '../../../routes/routes';

export interface IDeleteQueueProps {
    queue: IMessageQueue;
}

const DeleteQueue: React.FC<IDeleteQueueProps> = ({ queue }) => {
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(`Queue ${queue.ns}@${queue.name} has been successfully deleted.`, ENotificationType.SUCCESS));
            history.push(queues.getLink({namespace: queue.ns}));
        }
    }, [query.state.status]);
    const deleteQueueRequest = useCallback(() => {
        query.sendQuery(() => deleteQueue(queue.ns, queue.name));
    }, [`${queue.ns}@${queue.name}`]);
    return (
        <>
            <Button variant={'outline-primary'} onClick={deleteQueueRequest} className={'me-3'} size={'sm'}>
                Delete queue
            </Button>
        </>
    );
};

export default DeleteQueue;
