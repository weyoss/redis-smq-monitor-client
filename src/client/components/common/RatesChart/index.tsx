import React from 'react';
import { IConsumerRates, IProducerRates, IRates } from '../../../types/IRates';
import RechartsLineChart, { TRechartChartPropsLines } from '../LineChart/RechartsLineChart';

const RatesChart: React.FC<{ rates: IRates | IConsumerRates | IProducerRates; scope: string }> = ({ scope, rates }) => {
    const { input = 0, acknowledged = 0, unacknowledged = 0, processing = 0 } = rates as IRates;
    const lines: TRechartChartPropsLines = {
        input: {
            name: 'Published',
            color: '#1f78b4',
            value: input
        },
        processing: {
            name: 'Processing',
            color: '#e8a838',
            value: processing
        },
        acknowledged: {
            name: 'Acknowledged',
            color: '#61cdbb',
            value: acknowledged
        },
        unacknowledged: {
            name: 'Unacknowledged',
            color: '#f47560',
            value: unacknowledged
        }
    };
    return <RechartsLineChart lines={lines} scope={scope} />;
};

export default RatesChart;
