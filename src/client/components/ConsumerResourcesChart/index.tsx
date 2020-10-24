import React from 'react';
import { LineInterface } from '../Chart/contract';
import { Consumer } from '../../models/Consumer';
import { bytesToMB } from '../../tools/utils';
import Chart from '../Chart';

const ConsumerResourcesChart: React.FC<{ consumer: Consumer }> = ({ consumer }) => {
    const data = {
        rss: bytesToMB(consumer.resources.ram.usage.rss),
        cpu: consumer.resources.cpu.percentage
    };
    const leftLines: LineInterface[] = [
        {
            name: 'RAM (RSS)',
            dataKey: 'rss',
            color: '#1f78b4'
        }
    ];
    const rightLines: LineInterface[] = [
        {
            name: 'CPU (%)',
            dataKey: 'cpu',
            color: '#e8a838'
        }
    ];
    return <Chart leftAxisLines={leftLines} rightAxisLines={rightLines} data={data as any} />;
};

export default ConsumerResourcesChart;
