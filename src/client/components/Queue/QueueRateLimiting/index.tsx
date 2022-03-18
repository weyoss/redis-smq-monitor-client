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
    /**
     * Mapping (ns, name) -> (reload)
     *
     * Explicitly using useMemo instead of useEffect
     * When the QueueRateLimiting component is mounted for the first time, useEffect will always get triggered and will cause (reload) to be updated a second time
     * On the other hand useMemo is only dependant on (ns, name) changes
     */
    useMemo(() => {
        setReload(Date.now());
    }, [ns, name]);
    const dispatch = useDispatch();
    const request = useMemo(() => () => getQueueRateLimit(ns, name), [reload]);
    const clearRateLimitRequestCallback = useCallback(() => clearQueueRateLimit(ns, name), [reload]);
    const setRateLimitRequestCallback = useCallback(
        (limit: number, interval: number) => () => setQueueRateLimit(ns, name, interval, limit),
        [reload]
    );
    const onSetRateLimitSuccess = useCallback(() => {
        dispatch(addNotificationAction(`Queue rate limit has been successfully set.`, ENotificationType.SUCCESS));
        setReload(Date.now());
    }, [reload]);
    const onClearRateLimitSuccess = useCallback(() => {
        dispatch(addNotificationAction(`Queue rate limit has been successfully cleared.`, ENotificationType.SUCCESS));
        setReload(Date.now());
    }, [reload]);
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
