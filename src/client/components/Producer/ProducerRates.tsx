import React, { useCallback } from 'react';
import TimeSeriesChart from '../common/TimeSeriesChart/TimeSeriesChart';
import { getProducerPublishedTimeSeries } from '../../transport/http/api/time-series';

const ProducerRates: React.FC<{ namespace: string; queueName: string; producerId: string }> = ({
    queueName,
    namespace,
    producerId
}) => {
    const FetchPublishedTimeSeries = useCallback(
        (from: number, to: number) => () => getProducerPublishedTimeSeries(namespace, queueName, producerId, from, to),
        [namespace, queueName]
    );
    return (
        <TimeSeriesChart
            label={'Producer published'}
            scale={'messages'}
            stream={`streamProducerPublished:${producerId}`}
            FetchCharDataRequestFactory={FetchPublishedTimeSeries}
        />
    );
};

export default ProducerRates;
