import React from 'react';
import Query from '../Query';
import Chart from './Chart';
import { ITimeSeriesChartProps } from './TimeSeriesChart';

export const QueryTimeSeries: React.FC<{
    RequestFactory: ITimeSeriesChartProps['FetchTimeSeriesRequestFactory'];
    scale: string;
    label: string;
    from: number;
    to: number;
    onReady: () => void;
}> = ({ RequestFactory, scale, label, from, to, onReady }) => {
    return (
        <>
            <Query request={RequestFactory(from, to)}>
                {({ state }) => {
                    return <Chart timeSeries={state.data.data} label={label} scale={scale} onReady={onReady} />;
                }}
            </Query>
        </>
    );
};
