import React, { useCallback } from 'react';
import TimeSeriesChart from '../common/TimeSeriesChart/TimeSeriesChart';
import { getMultiQueueProducerPublishedTimeSeries } from '../../transport/http/api/time-series';

const MultiQueueProducerRates: React.FC<{ producerId: string }> = ({ producerId }) => {
    const FetchPublishedTimeSeries = useCallback(
        (from: number, to: number) => () => getMultiQueueProducerPublishedTimeSeries(producerId, from, to),
        [producerId]
    );
    return (
        <TimeSeriesChart
            label={'Multi-queue Producer published'}
            scale={'messages'}
            stream={`streamMultiQueueProducerPublished:${producerId}`}
            FetchCharDataRequestFactory={FetchPublishedTimeSeries}
        />
    );
};

export default MultiQueueProducerRates;
