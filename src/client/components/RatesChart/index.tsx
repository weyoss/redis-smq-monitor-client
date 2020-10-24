import React from 'react';
import { ConsumerRates, ProducerRates, Rates } from '../../models/Rates';
import { LineInterface } from '../Chart/contract';
import Chart from '../Chart';

const RatesChart: React.FC<{ rates: Rates | ConsumerRates | ProducerRates }> = ({ rates }) => {
    const lines: LineInterface[] = [
        {
            name: 'Input',
            dataKey: 'input',
            color: '#1f78b4'
        },
        {
            name: 'Processing',
            dataKey: 'processing',
            color: '#e8a838'
        },
        {
            name: 'Acknowledged',
            dataKey: 'acknowledged',
            color: '#61cdbb'
        },
        {
            name: 'Unacknowledged',
            dataKey: 'unacknowledged',
            color: '#f47560'
        }
    ];
    return <Chart data={rates as any} leftAxisLines={lines} />;
};

export default RatesChart;
