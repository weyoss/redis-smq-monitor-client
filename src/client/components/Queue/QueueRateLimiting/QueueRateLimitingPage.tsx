import React from 'react';
import { TGetQueueRateLimitResponse } from '../../../transport/http/api/queue-rate-limiting';
import { TQueryRequest } from '../../../hooks/useQuery';
import SetQueueRateLimit from './SetQueueRateLimit';
import SButton from '../../common/SButton/SButton';

const QueueRateLimitingPage: React.FC<{
    rateLimit: TGetQueueRateLimitResponse['data'];
    clearRateLimitRequestCallback: TQueryRequest<void>;
    clearRateLimitRequestSuccessCallback: () => void;
    setRateLimitRequestCallback: (limit: number, interval: number) => TQueryRequest<void>;
    setRateLimitRequestSuccessCallback: () => void;
}> = ({
    rateLimit,
    clearRateLimitRequestCallback,
    clearRateLimitRequestSuccessCallback,
    setRateLimitRequestCallback,
    setRateLimitRequestSuccessCallback
}) => {
    const params = () => {
        if (rateLimit) {
            return (
                <span>
                    Limit: {rateLimit.limit}, Interval: {rateLimit.interval}
                </span>
            );
        }
        return <span>Unlimited</span>;
    };
    return (
        <>
            <p>{params()}</p>
            <p>
                <SetQueueRateLimit
                    RequestFactory={setRateLimitRequestCallback}
                    requestSuccessCallback={setRateLimitRequestSuccessCallback}
                />
                {rateLimit && (
                    <SButton
                        variant={'outline-primary'}
                        onSuccess={clearRateLimitRequestSuccessCallback}
                        request={clearRateLimitRequestCallback}
                        btnCaption={'Clear rate limit'}
                        modalBody={<p>Are you sure you want to clear the rate limit</p>}
                        modalTitle={'Clear Queue Rate Limit'}
                    />
                )}
            </p>
        </>
    );
};

export default QueueRateLimitingPage;
