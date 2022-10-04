import React, { useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';
import { useDispatch } from 'react-redux';
import { deleteExchange } from '../../../transport/http/api/exchanges';
import useQuery, { EQueryStatus } from '../../../hooks/useQuery';
import { useHistory } from 'react-router';

export interface IDeleteExchangeProps {
    exchangeName: string;
}

const DeleteExchange: React.FC<IDeleteExchangeProps> = ({ exchangeName }) => {
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    useEffect(() => {
        if (query.state.status === EQueryStatus.SUCCESS) {
            dispatch(addNotificationAction(`Exchange has been successfully deleted.`, ENotificationType.SUCCESS));
            history.push('/');
        }
    }, [query.state.status]);
    const deleteExchangeRequest = useCallback(() => {
        query.sendQuery(() => deleteExchange(exchangeName));
    }, [exchangeName]);
    return (
        <>
            <Button variant={'outline-danger'} onClick={deleteExchangeRequest} className={'me-3'}>
                Delete exchange
            </Button>
        </>
    );
};

export default DeleteExchange;
