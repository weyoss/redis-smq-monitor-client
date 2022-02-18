import React, { useCallback, useMemo, useState } from 'react';
import {
    clearQueueRateLimit,
    getQueueRateLimit,
    setQueueRateLimit
} from '../../../transport/http/api/queue-rate-limiting';
import Query from '../../common/Query';
import QueueRateLimitPage from './QueueRateLimitingPage';
import { useDispatch } from 'react-redux';
import { addNotificationAction } from '../../../store/notifications/action';
import { ENotificationType } from '../../../store/notifications/state';

const QueueRateLimiting: React.FC<{ name: string; ns: string }> = ({ name, ns }) => {
    const [reload, setReload] = useState(Date.now());
    const dispatch = useDispatch();
    const request = useMemo(() => () => getQueueRateLimit(ns, name), [ns, name, reload]);
    const clearRateLimitRequestCallback = useCallback(() => clearQueueRateLimit(ns, name), [ns, name]);
    const setRateLimitRequestCallback = useCallback(
        (limit: number, interval: number) => () => setQueueRateLimit(ns, name, interval, limit),
        [ns, name]
    );
    const onSetRateLimitSuccess = useCallback(() => {
        dispatch(addNotificationAction(`Queue rate limit has been successfully set.`, ENotificationType.SUCCESS));
        setReload(Date.now());
    }, [ns, name, reload]);
    const onClearRateLimitSuccess = useCallback(() => {
        dispatch(addNotificationAction(`Queue rate limit has been successfully cleared.`, ENotificationType.SUCCESS));
        setReload(Date.now());
    }, [ns, name, reload]);
    return useMemo(
        () => (
            <Query request={request}>
                {({ state }) => {
                    return (
                        <QueueRateLimitPage
                            rateLimit={state.data.data}
                            setRateLimitRequestCallback={setRateLimitRequestCallback}
                            setRateLimitRequestSuccessCallback={onSetRateLimitSuccess}
                            clearRateLimitRequestCallback={clearRateLimitRequestCallback}
                            clearRateLimitRequestSuccessCallback={onClearRateLimitSuccess}
                        />
                    );
                }}
            </Query>
        ),
        [reload]
    );
};

export default QueueRateLimiting;
