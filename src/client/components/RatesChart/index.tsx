import React from 'react';
import { ConsumerRates, ProducerRates, Rates } from '../../models/Rates';
import { UPlotDataType } from '../UPlotChart/contract';
import UplotChart from '../UPlotChart';

const RatesChart: React.FC<{ rates: Rates | ConsumerRates | ProducerRates; scope?: string }> = ({ rates, scope }) => {
    const r = rates as Rates;
    const data: UPlotDataType = [
        {
            label: 'Input',
            value: r.input,
            color: '#1f78b4',
            scale: 'msg/sec'
        },
        {
            label: 'Processing',
            value: r.processing,
            color: '#e8a838',
            scale: 'msg/sec'
        },
        {
            label: 'Acknowledged',
            value: r.acknowledged,
            color: '#61cdbb',
            scale: 'msg/sec'
        },
        {
            label: 'Unacknowledged',
            value: r.unacknowledged,
            color: '#f47560',
            scale: 'msg/sec'
        }
    ];
    return <UplotChart data={data} scope={scope} />;
};

export default RatesChart;
