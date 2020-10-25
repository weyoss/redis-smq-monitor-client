import React from 'react';
import { Consumer } from '../../models/Consumer';
import { bytesToMB } from '../../tools/utils';
import { UPlotDataType } from '../UPlotChart/contract';
import UplotChart from '../UPlotChart';

const ConsumerResourcesChart: React.FC<{ consumer: Consumer }> = ({ consumer }) => {
    const data: UPlotDataType = [
        {
            label: 'RAM (RSS)',
            value: bytesToMB(consumer.resources.ram.usage.rss),
            color: '#1f78b4',
            scale: 'MB'
        },
        {
            label: 'CPU Usage',
            value: (consumer.resources.cpu.percentage as unknown) as number,
            color: '#e8a838',
            scale: '%'
        }
    ];
    return <UplotChart data={data} />;
};

export default ConsumerResourcesChart;
