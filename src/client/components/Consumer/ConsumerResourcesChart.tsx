import React from 'react';
import { IConsumer } from '../../types/IConsumer';
import { bytesToMB } from '../../tools/utils';
import RechartsLineChart, { TRechartChartPropsLines } from '../common/LineChart/RechartsLineChart';
import { Table } from 'react-bootstrap';

const ConsumerResourcesChart: React.FC<{ consumer: IConsumer }> = ({ consumer }) => {
    const lines: TRechartChartPropsLines = {
        cpu_percentage: {
            name: 'CPU Usage (%)',
            color: '#1f78b4',
            value: (consumer.resources.cpu.percentage as unknown) as number
        },
        ram_rss: {
            yAxisId: 'right',
            name: 'RAM (RSS, MB)',
            color: '#e8a838',
            value: bytesToMB(consumer.resources.ram.usage.rss)
        }
    };
    return (
        <>
            <RechartsLineChart lines={lines} biaxial={true} />
            <Table className={'table table-striped'} hover>
                <thead>
                    <tr>
                        <th scope="col">RAM (RSS, MB)</th>
                        <th scope="col">CPU Usage (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{bytesToMB(consumer.resources.ram.usage.rss)}</td>
                        <td>{consumer.resources.cpu.percentage}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default ConsumerResourcesChart;
