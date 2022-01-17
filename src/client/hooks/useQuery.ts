import { useCallback, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { addNotificationAction } from '../store/notifications/action';
import { ENotificationType } from '../store/notifications/state';

export enum EQueryStatus {
    IDLE,
    SUCCESS,
    ERROR,
    LOADING
}

export interface IQueryState<T> {
    status: EQueryStatus;
    data?: T;
    errorDetails?: Record<string, any>;
    errorMessage?: string;
}

export type TQueryRequest<T> = () => Promise<AxiosResponse<T>>;

const useQuery = <T>() => {
    const [state, setState] = useState<IQueryState<T>>({ status: EQueryStatus.IDLE });
    const dispatch = useDispatch();
    const sendQuery = useCallback((request: TQueryRequest<T>) => {
        setState({
            ...state,
            status: EQueryStatus.LOADING,
            data: undefined,
            errorDetails: undefined,
            errorMessage: undefined
        });
        request()
            .then(({ status, data }) => {
                setState({
                    ...state,
                    status: EQueryStatus.SUCCESS,
                    data
                });
            })
            .catch(function (error: AxiosError) {
                if (error.response) {
                    const msg = error.response.data?.error?.message ?? error.response.statusText;
                    const errorMessage = `Request failed with status ${error.response.status}: ${msg}`;
                    dispatch(addNotificationAction(errorMessage, ENotificationType.ERROR));
                    setState({
                        ...state,
                        status: EQueryStatus.ERROR,
                        errorMessage,
                        errorDetails: error.response.status === 422 ? error.response.data.error : undefined
                    });
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    const message = `No response was received from the server after sending an XHR request.`;
                    dispatch(addNotificationAction(message, ENotificationType.ERROR));
                    setState({
                        ...state,
                        status: EQueryStatus.ERROR,
                        errorMessage: `Could not receive any response from the server.`
                    });
                    console.log(error.request);
                } else {
                    dispatch(
                        addNotificationAction(
                            `An error occurred while setting up an request. This is probably a configuration error.`,
                            ENotificationType.ERROR
                        )
                    );
                    setState({
                        ...state,
                        status: EQueryStatus.ERROR,
                        errorMessage: error.message
                    });
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }, []);
    return { state, sendQuery };
};

export default useQuery;
