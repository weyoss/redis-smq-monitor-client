import React from 'react';
import { IConsumer } from '../../types/IConsumer';
import { bytesToMB } from '../../tools/utils';
import { UPlotDataType } from '../common/UPlotChart/contract';
import UplotChart from '../common/UPlotChart';

const ConsumerResourcesChart: React.FC<{ consumer: IConsumer }> = ({ consumer }) => {
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
