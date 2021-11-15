import React, { ReactElement, useEffect } from 'react';
import useQuery, { EQueryStatus, IQueryState } from '../../../hooks/useQuery';
import { AxiosResponse } from 'axios';
import { Alert, Spinner } from 'react-bootstrap';

interface IProps {
    request: () => Promise<AxiosResponse>;
    children(props: { state: IQueryState<any> }): ReactElement;
}

const Query: React.FC<IProps> = ({ request, children }) => {
    const { state, sendQuery } = useQuery();
    useEffect(() => {
        sendQuery(request);
    }, [request]);
    if ([EQueryStatus.LOADING, EQueryStatus.IDLE].includes(state.status)) {
        return <Spinner animation={'border'} />;
    }
    if (state.status === EQueryStatus.SUCCESS) {
        return children({ state });
    }
    return <Alert variant={'danger'}>{state.errorMessage || ''}</Alert>;
};

export default Query;
