import React from 'react';
import { ConsumerRates, ProducerRates, Rates } from '../../models/Rates';
import { UPlotDataType } from '../UPlotChart/contract';
import UplotChart from '../UPlotChart';

const RatesChart: React.FC<{ rates: Rates | ConsumerRates | ProducerRates; scope?: string }> = ({ rates, scope }) => {
    const { input = 0, acknowledged = 0, unacknowledged = 0, processing = 0 } = rates as Rates;
    const data: UPlotDataType = [
        {
            label: 'Input',
            value: input,
            color: '#1f78b4',
            scale: 'msg/sec'
        },
        {
            label: 'Processing',
            value: processing,
            color: '#e8a838',
            scale: 'msg/sec'
        },
        {
            label: 'Acknowledged',
            value: acknowledged,
            color: '#61cdbb',
            scale: 'msg/sec'
        },
        {
            label: 'Unacknowledged',
            value: unacknowledged,
            color: '#f47560',
            scale: 'msg/sec'
        }
    ];
    return <UplotChart data={data} scope={scope} />;
};

export default RatesChart;
